import { QUERY_KEYS } from "@/app/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const getSuiPriceUSD = async () => {
  const res = await axios.get<{ sui: { usd: number } }>(
    "https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd"
  );
  return res.data.sui.usd;
};

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
