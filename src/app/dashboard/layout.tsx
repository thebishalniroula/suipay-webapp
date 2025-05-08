"use client";

import { Sidebar } from "@/components/ui/dashboard/sidebar";
import { Button } from "@/components/ui/button";

const walletAddress = "0x38-hvftyyfv-f"; // You can also fetch it dynamically

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="w-full flex justify-end items-center px-6 py-4 bg-transparent">
          <Button className="bg-[#6c63ff] text-white rounded-[15px] px-4 py-2">
            {walletAddress}
          </Button>
        </header>

        <main className="flex-1 px-4 pt-4">{children}</main>
      </div>
    </div>
  );
}
