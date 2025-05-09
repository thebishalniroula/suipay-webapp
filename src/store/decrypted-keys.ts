import { create } from "zustand";

type DecryptedKeys = {
  privateKey: string;
  mnemonic: string;
};

type DecryptedKeysActions = {
  setKeys: (mnemonic: string, privateKey: string) => void;
};
export const useDecryptedKeysStore = create<
  DecryptedKeys & DecryptedKeysActions
>((set) => ({
  mnemonic: "",
  privateKey: "",
  setKeys: (mnemonic, privateKey) => {
    return set({ mnemonic, privateKey });
  },
}));
