"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

import { SuiClientProvider } from "@mysten/dapp-kit";
import { useDecryptedKeysStore } from "@/store/decrypted-keys";
import PasswordPrompt from "@/components/ui/password-prompt";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { decryptData, EncryptedData } from "@/utils/encryption";
import { getCookie } from "cookies-next";

const networks = {
  devnet: { url: "https://fullnode.devnet.sui.io:443" },
};

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  const { privateKey, setKeys } = useDecryptedKeysStore();

  const { encrypted } = useWalletEssentialsStore();
  useSyncWalletStoreWithCookiesOnLoad();

  const handleSubmit = async (password: string) => {
    const decryptedPrivateKey = await decryptData(
      encrypted.privateKey,
      password
    );
    const decryptedMnemonic = await decryptData(encrypted.mnemonic, password);
    setKeys(decryptedMnemonic, decryptedPrivateKey);
  };

  return (
    <QueryClientProvider client={client}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        {!privateKey && <PasswordPrompt onSubmit={handleSubmit} />}
        {children}
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

const useSyncWalletStoreWithCookiesOnLoad = () => {
  const { setEncrypted, setPlain } = useWalletEssentialsStore();
  useEffect(() => {
    (async () => {
      const accessToken = await getCookie("accessToken");
      const address = await getCookie("address");
      const publicKey = await getCookie("publicKey");
      const scwAddress = await getCookie("scwAddress");

      const encryptedMnemonic = JSON.parse(
        (await getCookie("mnemonic")) ?? ""
      ) as EncryptedData;
      const encryptedPrivateKey = JSON.parse(
        (await getCookie("privateKey")) ?? ""
      ) as EncryptedData;

      if (
        !accessToken ||
        !address ||
        !publicKey ||
        !scwAddress ||
        !encryptedMnemonic ||
        !encryptedPrivateKey
      ) {
        return;
      }

      setEncrypted({
        mnemonic: encryptedMnemonic,
        privateKey: encryptedPrivateKey,
      });

      setPlain({
        accessToken,
        address,
        publicKey,
        scwAddress,
      });
    })();
  }, []);
};
