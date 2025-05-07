"use client";

import AddProductModal from "@/components/ui/dashboard/AddProductModal";
import { Sidebar } from "@/components/ui/dashboard/sidebar";
import { useRouter } from "next/navigation";
import { GoPlus } from "react-icons/go";

export default function Products() {
  const router = useRouter();
  const walletAddress =
    "0x381afafdb0ce4ac0668284ba52db28544cb88e47985243f07cfd7a15592db5de";

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 px-8 py-6 relative">
        <div className="absolute top-6 right-8">
          <button className="bg-[#A78BFA] text-white text-sm px-4 py-2 rounded-full">
            {walletAddress.slice(0, 8)}...{walletAddress.slice(-3)}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20">
          <AddProductModal />
        </div>
      </main>
    </div>
  );
}
