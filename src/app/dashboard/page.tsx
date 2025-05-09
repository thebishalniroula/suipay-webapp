"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { IoIosArrowRoundUp } from "react-icons/io";
import Link from "next/link";
import { MIST_PER_SUI } from "@mysten/sui/dist/cjs/utils";
import { TransactionItem } from "@/components/TransactionItem";
import useGetTransactionHistory from "@/hooks/use-get-transaction-history";

import { WalletEssentials } from "@/types";
import { STORAGE_KEYS } from "../config/storage-keys";

const address =
  "0xc512b99fcf83dc1232f280b01ac2c56b253461b608f754225339eccfa2557fa0";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YzUxMmI5OWZjZjgzZGMxMjMyZjI4MGIwMWFjMmM1NmIyNTM0NjFiNjA4Zjc1NDIyNTMzOWVjY2ZhMjU1N2ZhMCIsInR5cGUiOiJVU0VSIiwiaWF0IjoxNzQ2Nzc4MTg4LCJleHAiOjE3NDY4NjQ1ODh9.edVXuR1jqatRLn7GjnLAyCOdojsiGW7YCYfDFfknGzA";

export default function Dashboard() {
  const history = useGetTransactionHistory(address, accessToken);
  const balance = 55.43;

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 pt-6 px-4 flex flex-col items-center">
        <div className="bg-transparent border border-[#47278C] rounded-3xl p-8 w-full max-w-md">
          <div className="mb-6">
            <p className="text-gray-400 mb-1">Balance</p>
            <h2 className="text-4xl font-bold text-white">{balance} SUI</h2>
            <p className="text-[#6c63ff]">${(balance * 2.02).toFixed(2)}</p>
          </div>

          <div className="flex gap-4 mb-6">
            <Link href="/dashboard/deposit" className="flex-1">
              <Button className="w-full bg-[#6c63ff] hover:bg-[#5a52d5] text-white font-medium h-[65px] px-4 rounded-[26px] flex items-center justify-center">
                <ArrowDown className="w-5 h-5 mr-2" />
                Deposit
              </Button>
            </Link>

            <Link href="/dashboard/send" className="flex-1">
              <Button className="w-full bg-[#CFC4E7] hover:bg-[#6c63ff]  h-[65px] px-4 rounded-[26px] text-black font-medium flex items-center justify-center">
                <IoIosArrowRoundUp className="w-5 h-5 mr-2" />
                Send
              </Button>
            </Link>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-6">
              Recent Activity
            </h3>
            <div className="w-full flex flex-col gap-2 pb-23">
              {!history.data?.transactions.length && (
                <p className="text-center opacity-50">No transactions</p>
              )}
              {history.data?.transactions.map((item: any, key: any) => {
                return <TransactionItem transaction={item} key={key} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
