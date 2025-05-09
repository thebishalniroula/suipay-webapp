import { QUERY_KEYS } from "@/app/config/query-keys";
import { axiosInstance } from "@/client/axios";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { useQuery } from "@tanstack/react-query";

export type Webhook = {
  id: string;
  url: string;
  secret: string;
  productId: string;
  product: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

type Response = {
  success: boolean;
  count: number;
  webhooks: Array<Webhook>;
};

const getWebhooks = async (accessToken: string) => {
  const res = await axiosInstance.get<Response>("/webhook/api-webhooks", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

const useGetWebhooks = () => {
  const {
    plain: { accessToken },
  } = useWalletEssentialsStore();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_WEBHOOKS],
    queryFn: () => getWebhooks(accessToken),
    enabled: !!accessToken,
  });
};

export default useGetWebhooks;
