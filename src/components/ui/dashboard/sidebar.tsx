"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { Button } from "../button";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("address");
    deleteCookie("publicKey");
    deleteCookie("scwAddress");
    deleteCookie("mnemonic");
    deleteCookie("privateKey");

    router.push("/");
  };

  const linkClass = (path: string) =>
    `flex items-center px-4 h-[61px] py-2 rounded-lg font-medium transition-colors duration-200 ${
      pathname === path
        ? "bg-[#7E7AF2] text-white text-[22px] font-semibold"
        : "text-white text-[22px] font-normal hover:bg-[#1a1a2e]"
    }`;

  return (
    <>
      <aside className="w-[214px] pt-6 px-8 flex flex-col">
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

          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center px-4 py-2 rounded-lg text-[22px] font-normal text-white hover:bg-[#1a1a2e] mt-auto text-left"
          >
            Logout
          </button>
        </nav>
      </aside>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-[#1a1a2e] rounded-xl p-6 text-white max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-1">Confirm Logout</h2>
            <p className="text-sm mb-6">Are you sure you want to logout?</p>
            <div className="flex-1 flex justify-end gap-4">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="w-full"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
