import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

export const sui = new SuiClient({ url: getFullnodeUrl("testnet") });

export const serverKeyPair = Ed25519Keypair.fromSecretKey(
  process.env.SUI_SECRET_KEY
);

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
