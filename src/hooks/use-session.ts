"use client";

import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const accessToken = getCookie("accessToken") as string | undefined;
      const address = getCookie("address") as string | undefined;

      if (accessToken && address) {
        return { accessToken, address };
      } else {
        throw new Error("No session");
      }
    },
    retry: 10,
    retryDelay: 3000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && data) {
      router.push("/dashboard");
    }
  }, [data, isLoading, router]);

  return { data, isLoading };
};
