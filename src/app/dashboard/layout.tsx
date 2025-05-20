"use client";

import { Sidebar } from "@/components/ui/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1f1f3b",
              color: "#fff",
              borderRadius: "12px",
              padding: "14px 16px",
            },
            success: {
              iconTheme: {
                primary: "#7E7AF2",
                secondary: "#fff",
              },
            },
          }}
        />
        {/* <Header /> */}
        <main className="flex-1 px-4 pt-20">{children}</main>
      </div>
    </div>
  );
}

const Header = () => {
  const {
    plain: { address },
  } = useWalletEssentialsStore();
  return (
    <header className="w-full flex justify-end items-center px-6 py-4 bg-transparent">
      <Button className="bg-[#6c63ff] text-white rounded-[15px] px-4 py-2">
        {address}
      </Button>
    </header>
  );
};
