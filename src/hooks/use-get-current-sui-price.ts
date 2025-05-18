import { QUERY_KEYS } from "@/app/config/query-keys";
import { axiosInstance } from "@/client/axios";
import { useQuery } from "@tanstack/react-query";

type Response = {
  symbol: "SUI";
  name: "Sui";
  price: number;
  percent_change_24h: number;
  market_cap: number;
  volume_24h: number;
  last_updated: string;
};

async function getSuiPriceUSD() {
  const response = await axiosInstance.get<Response>("/price");
  return response.data.price;
}

// @TOOD: Cache this to local storage
const useGetCurrentSuiPrice = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SUI_VALUE],
    queryFn: async () => {
      return await getSuiPriceUSD();
    },
    staleTime: Infinity,
  });
};

export default useGetCurrentSuiPrice;
