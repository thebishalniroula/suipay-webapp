import React, { useEffect, useRef, useState } from "react";
import { baseApi } from "../const/api";
import { useQueryClient } from "@tanstack/react-query";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { QUERY_KEYS } from "@/app/config/query-keys";

const SERVER_URL = `ws://${baseApi}/api/wallet/merchantDepositAddress`;

const useWSDepositAddress = () => {
  const socketRef = useRef<WebSocket>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const {
    plain: { accessToken },
  } = useWalletEssentialsStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    socketRef.current = new WebSocket(`${SERVER_URL}?token=${accessToken}`);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    socketRef.current.onmessage = (event) => {
      console.log("Received message:", event.data);
      setMessages((prev) => [...prev, JSON.parse(event.data ?? "{}")]);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TRANSACTION_HISTORY],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_BALANCE] });
      // setMessages((prev) => [...prev, { status: 'Disconnected' }])
    };

    // Cleanup on unmount
    return () => {
      socketRef.current?.close();
    };
  }, [accessToken]);

  return { messages };
};

export default useWSDepositAddress;
