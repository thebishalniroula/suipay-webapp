import { QUERY_KEYS } from "@/app/config/query-keys";
import { axiosInstance } from "@/client/axios";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { useQuery } from "@tanstack/react-query";

export type Product = {
  id: string;
  name: string;
  price: string;
  productType: string;
  recurringPeriod: number;
  subscribersRegistry: string;
  merchantId: string;
};

type Response = {
  success: boolean;
  count: number;
  products: Array<Product>;
};

const getProducts = async (accessToken: string) => {
  const res = await axiosInstance.get<Response>(`/product/products`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

const useGetProducts = () => {
  const {
    plain: { accessToken },
  } = useWalletEssentialsStore();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS],
    queryFn: () => getProducts(accessToken),
    enabled: !!accessToken,
  });
};

export default useGetProducts;
