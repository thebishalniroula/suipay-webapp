import React from "react";
import { Transaction } from "@mysten/sui/transactions";
import { Clock, PackageId } from "../const/packages";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SuiClient } from "@mysten/sui/client";
import { useSuiClient } from "@mysten/dapp-kit";
import { useMutation } from "@tanstack/react-query";
import { MIST_PER_SUI } from "@mysten/sui/utils";
import { useDecryptedKeysStore } from "@/store/decrypted-keys";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";

export const createSendSuiTxn = (
  amount: number,
  scwId: string,
  toAddress: string
) => {
  const txn = new Transaction();
  console.log({
    amount,
    scwId,
    toAddress,
  });
  txn.moveCall({
    target: `${PackageId}::suipay::withdrawToAddressFromSuiPayWallet`,
    arguments: [
      txn.pure.u64(amount),
      txn.object(scwId),
      txn.pure.address(toAddress),
      txn.object(Clock),
    ],
  });
  return txn;
};

export const signAndExecute = async (
  privateKey: string,
  txn: Transaction,
  suiClient: SuiClient
) => {
  const keyPair = Ed25519Keypair.fromSecretKey(privateKey);
  return suiClient.signAndExecuteTransaction({
    transaction: txn,
    signer: keyPair,
  });
};

const useSendSui = () => {
  const suiClient = useSuiClient();
  const privateKey = useDecryptedKeysStore((state) => state.privateKey);
  const {
    plain: { scwAddress },
  } = useWalletEssentialsStore();

  return useMutation({
    mutationFn: async (data: { amount: number; toAddress: string }) => {
      return signAndExecute(
        privateKey,
        createSendSuiTxn(
          data.amount * Number(MIST_PER_SUI),
          scwAddress,
          data.toAddress
        ),
        suiClient
      );
    },
  });
};

export default useSendSui;
