import { axiosInstance } from "@/client/axios";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { useMutation } from "@tanstack/react-query";

type Response = {
  success: boolean;
  count: number;
  webhooks: Array<{
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
  }>;
};
const addWebhook = async (url: string, accessToken: string) => {
  const res = await axiosInstance.post<Response>(
    "/webhook/api-webhooks",
    { url },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

const useAddWebhook = () => {
  const {
    plain: { accessToken },
  } = useWalletEssentialsStore();
  return useMutation({
    mutationFn: (url: string) => addWebhook(url, accessToken),
  });
};

export default useAddWebhook;
