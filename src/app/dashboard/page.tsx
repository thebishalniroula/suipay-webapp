"use client";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/dashboard/sidebar";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

export default function Dashboard() {
  const walletAddress = "0x38-hvftyyfv-f";
  const balance = 55.43;
  const transactions = [
    {
      type: "Deposit",
      hash: "0x65fg2...32fd",
      amount: "+50 SUI",
      value: "$95.44",
      timestamp: new Date().toISOString(),
    },
    {
      type: "Send",
      hash: "0x45fg2...32fd",
      amount: "-13 SUI",
      value: "$24.44",
      timestamp: new Date().toISOString(),
    },
    {
      type: "Deposit",
      hash: "0x25fg2...32fd",
      amount: "+50 SUI",
      value: "$95.44",
      timestamp: new Date().toISOString(),
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 pt-6 px-4 flex flex-col items-center">
        <div className="self-end mb-6">
          <button className="bg-[#6c63ff] text-white rounded-[15px] px-4 py-2">
            {walletAddress}
          </button>
        </div>

        <div className="bg-transparent border border-[#47278C] rounded-3xl p-8 w-full max-w-md">
          <div className="mb-6">
            <p className="text-gray-400 mb-1">Balance</p>
            <h2 className="text-4xl font-bold text-white">{balance} SUI</h2>
            <p className="text-[#6c63ff]">$ {(balance * 2.02).toFixed(2)}</p>
          </div>

          <div className="flex gap-4 mb-6">
            <Link href="/dashboard/deposit" className="flex-1">
              <Button className="w-full bg-[#6c63ff] hover:bg-[#5a52d5] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <ArrowDown className="w-5 h-5 mr-2" />
                Deposit
              </Button>
            </Link>

            <Link href="/dashboard/send" className="flex-1">
              <Button className="w-full bg-[#CFC4E7] hover:bg-[#6c63ff] text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <IoIosArrowRoundUp className="w-5 h-5 mr-2" />
                Send
              </Button>
            </Link>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-8">
              Recent Activity
            </h3>
            {transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#1D223E] rounded-[12px] p-3"
                  >
                    <div className="flex items-center">
                      <div className="bg-[#6c63ff]/20 rounded-full p-1 mr-3">
                        {tx.type === "Deposit" ? (
                          <IoIosArrowRoundUp className="w-4 h-4 text-[#6c63ff]" />
                        ) : (
                          <IoIosArrowRoundDown className="w-4 h-4 text-[#6c63ff]" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{tx.type}</p>
                        <p className="text-xs text-gray-400">{tx.hash}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          tx.type === "Deposit"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {tx.amount}
                      </p>
                      <p className="text-xs text-gray-400">{tx.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-500">
                No transaction Yet
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
