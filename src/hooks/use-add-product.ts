import { axiosInstance } from "@/client/axios";
import { PackageId, ProductRegistry } from "@/const/packages";
import { useDecryptedKeysStore } from "@/store/decrypted-keys";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { useSuiClient } from "@mysten/dapp-kit";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { useMutation } from "@tanstack/react-query";

type Request = {
  signature: string;
  bytes: string;
};

type Response = {
  success: boolean;
  product: {
    id: string;
    name: string;
    price: string;
    productType: string;
    recurringPeriod: number;
    subscribersRegistry: string;
    merchantId: string;
  };
};

const addProduct = async (params: Request, accessToken: string) => {
  const res = await axiosInstance.post<Response>(
    "/product/createProduct",
    params,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

export type AddProductParams = {
  name: string;
  price: string;

  recurringPeriod: number;
};

const useAddProduct = () => {
  const { privateKey } = useDecryptedKeysStore();

  const {
    plain: { scwAddress, address, accessToken },
  } = useWalletEssentialsStore();
  const suiClient = useSuiClient();

  return useMutation({
    mutationFn: async (params: AddProductParams) => {
      const txn = createAddProductTxnBlock({ ...params, scwAddress });

      const keyPair = Ed25519Keypair.fromSecretKey(privateKey);

      txn.setSender(keyPair.toSuiAddress());

      const txBytes = await txn.build({
        client: suiClient,
      });

      const signature = await keyPair.signTransaction(txBytes);

      return addProduct(signature, accessToken);
    },
  });
};

export default useAddProduct;

/**
 * Create a transaction block that adds a product.
 * @param params The parameters to the `createOneTimeProduct` or `createRecurrentProduct` function.
 * This includes the name, price, and scwAddress of the product, as well as the recurring period if it is a recurring product.
 * @returns The transaction block.
 */
const createAddProductTxnBlock = (
  params: AddProductParams & { scwAddress: string }
): Transaction => {
  const function_name = !params.recurringPeriod
    ? "createOneTimeProduct"
    : "createRecurrentProduct";

  const target = `${PackageId}::product::${function_name}`;
  const txn = new Transaction();

  txn.moveCall({
    target,
    arguments: [
      txn.pure.string(params.name),
      txn.pure.u64(params.price),
      txn.object(ProductRegistry),
      // pass this only if recurring period is non zero.
      ...(!!params.recurringPeriod
        ? [txn.pure.u64(params.recurringPeriod * 1000)] // convert to milliseconds
        : []),
      txn.object(params.scwAddress),
    ],
  });

  return txn;
};
