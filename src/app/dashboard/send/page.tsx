"use client";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/dashboard/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function Dashboard() {
  const walletAddress = "0x38-hvftyyfv-f";
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 pt-6 px-4 flex flex-col items-center">
        <div className="self-end mb-6">
          <button className="bg-[#6c63ff] text-white rounded-[15px] px-4 py-2">
            {walletAddress}
          </button>
        </div>

        <div className="bg-transparent border border-[#47278C] rounded-3xl p-8 w-full max-w-md flex flex-col items-center text-center">
          <div className="relative w-full flex items-center justify-center mb-6">
            <button
              onClick={() => router.back()}
              className="absolute left-0 cursor-pointer"
            >
              <RiArrowLeftSLine className="text-white w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold text-white">Send Sui</h2>
          </div>

          <div className="mb-6 rounded-full bg-[#292E54] p-4">
            <Image src="/sui.svg" alt="logo" width={69} height={91} />
          </div>

          <input
            type="text"
            placeholder="Recipient’s Wallet Address"
            className="w-full bg-transparent border border-[#2C2E4A] rounded-lg py-3 px-4 text-white placeholder-gray-400 mb-2 focus:outline-none"
          />

          <div className="w-full flex items-center border border-[#2C2E4A] rounded-lg px-4 mb-2">
            <input
              type="number"
              placeholder="Amount"
              className="flex-1 bg-transparent py-3 text-white placeholder-gray-400 focus:outline-none"
            />
            <span className="text-white mr-2">SUI</span>
            <Button className="text-sm text-white bg-[#3A3C5B] px-2 py-1 rounded-md hover:bg-[#5a52d5]">
              Max
            </Button>
          </div>

          <p className="w-full text-right text-sm text-white mb-6">
            Available: 55.544 SUI
          </p>

          <div className="flex w-full gap-4">
            <Button className="flex-1 bg-[#CFC4E7] text-black font-semibold py-6 px-4 rounded-lg hover:bg-[#b9aee2] transition-colors duration-200">
              Cancel
            </Button>
            <Button className="flex-1 bg-[#6c63ff] text-white font-semibold py-6 px-4 rounded-lg hover:bg-[#5a52d5] transition-colors duration-200">
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
