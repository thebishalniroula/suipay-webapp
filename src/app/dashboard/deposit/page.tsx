"use client";

import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const walletAddress = "0x38-hvftyyfv-f";

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 pt-6 px-4 flex flex-col items-center">
        <div className="bg-transparent border border-[#47278C] rounded-3xl p-8 w-full max-w-md flex flex-col items-center text-center">
          <div className="relative w-full flex items-center justify-center mb-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="absolute left-0 cursor-pointer"
            >
              <RiArrowLeftSLine className="text-white w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold text-white">Deposit</h2>
          </div>

          <div className="bg-[#1E213E] text-[#FF4D6B] px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">This address is valid for 4:59</p>

            <p className="text-sm text-white mb-4">
              This is a smart contract address, it&aposs not permanent. Address
              refresh in every 5 minutes
            </p>
          </div>

          <div className="bg-white p-2 rounded-lg mb-6">
            <QRCode
              value="0x381afafdb0ce4ac0668284ba52db28544cb88e47985243f07cfd7a15592db5de"
              className="bg-white p-2 rounded-lg"
            />
          </div>

          <p className="text-white text-xs break-all text-center mb-4 max-w-xs mx-auto">
            0x381afafdb0ce4ac0668284ba52db28544cb88e47985243f07cfd7a15592db5dexcvsfvsffhgvjhcgvh
          </p>

          <Button className="bg-[#1E213E] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#5a52d5] transition-colors duration-200">
            Copy Address
          </Button>
        </div>
      </main>
    </div>
  );
}
