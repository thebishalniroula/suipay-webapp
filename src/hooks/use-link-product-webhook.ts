import { axiosInstance } from "@/client/axios";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { useMutation } from "@tanstack/react-query";

const linkWebhookProduct = async (
  productId: string,
  webhookId: string,
  accessToken: string
) => {
  const res = await axiosInstance.post(
    `/webhook/products/${productId}/webhooks`,
    {
      webhookId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const useLinkProductWebhook = () => {
  const {
    plain: { accessToken },
  } = useWalletEssentialsStore();
  return useMutation({
    mutationFn: (params: { productId: string; webhookId: string }) =>
      linkWebhookProduct(params.productId, params.webhookId, accessToken),
  });
};

export default useLinkProductWebhook;
