"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

import { SuiClientProvider } from "@mysten/dapp-kit";
import { useDecryptedKeysStore } from "@/store/decrypted-keys";
import PasswordPrompt from "@/components/ui/password-prompt";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { decryptData, EncryptedData } from "@/utils/encryption";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { safeParseJSON } from "@/lib/utils";

const networks = {
  testnet: { url: "https://fullnode.testnet.sui.io:443" },
};

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  const { privateKey, setKeys } = useDecryptedKeysStore();

  const { encrypted, plain } = useWalletEssentialsStore();
  useSyncWalletStoreWithCookiesOnLoad();

  const handleSubmit = async (password: string) => {
    try {
      const decryptedPrivateKey = await decryptData(
        encrypted.privateKey,
        password
      );
      const decryptedMnemonic = await decryptData(encrypted.mnemonic, password);
      setKeys(decryptedMnemonic, decryptedPrivateKey);
    } catch (error) {
      console.log("Error decrypting keys:", error);
      toast.error("Invalid password. Please try again.");
    }
  };

  return (
    <QueryClientProvider client={client}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        {plain.accessToken && !privateKey && (
          <PasswordPrompt onSubmit={handleSubmit} />
        )}
        {children}
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

const useSyncWalletStoreWithCookiesOnLoad = () => {
  const { setEncrypted, setPlain } = useWalletEssentialsStore();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    (async () => {
      const accessToken = await getCookie("accessToken");
      const address = await getCookie("address");
      const publicKey = await getCookie("publicKey");
      const scwAddress = await getCookie("scwAddress");

      const encryptedMnemonic = safeParseJSON(
        (await getCookie("mnemonic")) ?? ""
      ) as EncryptedData;
      const encryptedPrivateKey = safeParseJSON(
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

      setHydrated(true);
    })();
  }, []);
};
