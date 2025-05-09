import { useMutation, useQuery } from "@tanstack/react-query";
import useGetCurrentSuiPrice from "./use-get-current-sui-price";

const useSuiToUSD = (sui: number) => {
  const { data } = useGetCurrentSuiPrice();
  return useQuery({
    queryKey: ["suiToUSD", sui],
    queryFn: async () => {
      return data ? (sui * data).toFixed(2) : "...";
    },
  });
};

export default useSuiToUSD;
