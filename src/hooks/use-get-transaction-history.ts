import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/client/axios";
import { QUERY_KEYS } from "@/app/config/query-keys";

export type Transaction = {
  amount: string;
  amountSui: string;
  coin: string;
  party: string;
  timestamp: string;
  memo: string;
  incoming: boolean;
};

type Response = {
  transactions: Array<Transaction>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

const getTransactionHistory = async (address: string, token: string) => {
  return axiosInstance.get<Response>(`/wallet/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      userType: "MERCHANT",
      id: address,
    },
  });
};

const useGetTransactionHistory = (address: string, accessToken: string) => {
  console.log("useGetTransactionHistory", { address, accessToken });
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TRANSACTION_HISTORY],
    queryFn: async () => {
      const res = await getTransactionHistory(address, accessToken);
      return res.data;
    },
    enabled: !!address || !!accessToken,
  });
};

export default useGetTransactionHistory;
