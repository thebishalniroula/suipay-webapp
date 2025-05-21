import React, { useEffect, useRef, useState } from "react";
import { baseApi } from "../const/api";
import { useQueryClient } from "@tanstack/react-query";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { QUERY_KEYS } from "@/app/config/query-keys";

const SERVER_URL = `wss://${baseApi}/api/wallet/merchantDepositAddress`;

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

    socketRef.current.onerror = (e) => {
      console.log("WebSocket error event:", e);

      // Try extracting additional info (if possible)
      if (e instanceof ErrorEvent) {
        console.log("WebSocket error details:", e.message);
      } else {
        console.warn("WebSocket error: no additional error info available.");
      }
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
