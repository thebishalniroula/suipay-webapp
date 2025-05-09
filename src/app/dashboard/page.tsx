"use client";

import { Button } from "@/components/ui/button";

import { IoIosArrowRoundUp } from "react-icons/io";
import Link from "next/link";

import { TransactionItem } from "@/components/TransactionItem";
import useGetTransactionHistory from "@/hooks/use-get-transaction-history";

import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { GoArrowDown } from "react-icons/go";

export default function Dashboard() {
  const { plain, encrypted } = useWalletEssentialsStore();

  const history = useGetTransactionHistory(plain.address, plain.accessToken);
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
                <GoArrowDown className="w-5 h-5 mr-2" />
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
