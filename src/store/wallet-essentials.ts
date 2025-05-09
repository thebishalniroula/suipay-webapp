import { EncryptedData } from "@/utils/encryption";
import { getCookie, setCookie } from "cookies-next";
import { create } from "zustand";

export type WalletEssentials = {
  plain: {
    address: string;
    publicKey: string;
    accessToken: string;
    scwAddress: string;
  };
  encrypted: {
    privateKey: EncryptedData;
    mnemonic: EncryptedData;
  };
};

type WalletEssentialsActions = {
  setPlain: (plain: WalletEssentials["plain"]) => void;
  setEncrypted: (encrypted: WalletEssentials["encrypted"]) => void;
};

export const useWalletEssentialsStore = create<
  WalletEssentials & WalletEssentialsActions
>((set) => ({
  plain: {
    address: "",
    publicKey: "",
    accessToken: "",
    scwAddress: "",
  },
  encrypted: {
    privateKey: {
      ciphertext: "",
      salt: "",
      iv: "",
    },
    mnemonic: {
      ciphertext: "",
      salt: "",
      iv: "",
    },
  },

  setPlain: (plain) => {
    setCookie("address", plain.address);
    setCookie("publicKey", plain.publicKey);
    setCookie("accessToken", plain.accessToken);
    setCookie("scwAddress", plain.scwAddress);
    return set({ plain });
  },
  setEncrypted: (encrypted) => {
    setCookie("privateKey", encrypted.privateKey);
    setCookie("mnemonic", encrypted.mnemonic);
    return set({ encrypted });
  },
}));
