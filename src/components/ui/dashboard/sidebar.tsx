"use client";

import Image from "next/image";

import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-48 pt-6 px-4 flex flex-col">
      <div className="flex items-center gap-2 mb-12 pl-2">
        <div className="text-white">
          <Image src="/logo.svg" alt="logo" width={33} height={33} />
        </div>
        <span className="text-xl font-semibold text-white">SuiPay</span>
      </div>

      <nav className="flex flex-col space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center px-4 py-2 rounded-lg bg-[#6c63ff] text-white font-medium"
        >
          Wallet
        </Link>
        <Link
          href="/dashboard/products"
          className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-[#1a1a2e]"
        >
          Products
        </Link>
        <Link
          href="/dashboard/webhook"
          className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-[#1a1a2e]"
        >
          Web Hook
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-[#1a1a2e]"
        >
          Settings
        </Link>
        <div className="flex-grow"></div>
        <button className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-[#1a1a2e] mt-auto text-left">
          Logout
        </button>
      </nav>
    </aside>
  );
}
