"use client";

import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const linkClass = (path: string) =>
    `flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
      pathname === path
        ? "bg-[#6c63ff] text-white"
        : "text-white hover:bg-[#1a1a2e]"
    }`;

  return (
    <aside className="w-48 pt-6 px-4 flex flex-col">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 mb-12 pl-2 cursor-pointer"
      >
        <div className="text-white">
          <Image src="/logo.svg" alt="logo" width={33} height={33} />
        </div>
        <span className="text-xl font-semibold text-white">SuiPay</span>
      </Link>

      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Wallet
        </Link>
        <Link
          href="/dashboard/products"
          className={linkClass("/dashboard/products")}
        >
          Products
        </Link>
        <Link
          href="/dashboard/webhook"
          className={linkClass("/dashboard/webhook")}
        >
          Web Hook
        </Link>
        <Link
          href="/dashboard/settings"
          className={linkClass("/dashboard/settings")}
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
