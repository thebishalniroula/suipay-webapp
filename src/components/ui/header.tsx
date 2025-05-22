"use client";
import React from "react";

import { useRouter } from "next/navigation";
type HeaderProps = {
  title: string;
  onBack?: () => void;
};
import { RiArrowLeftSLine } from "react-icons/ri";
const Header = (props: HeaderProps) => {
  const router = useRouter();
  return (
    <div className="relative w-full flex items-center justify-center mb-6">
      {props.onBack && (
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="absolute left-0 cursor-pointer"
        >
          <RiArrowLeftSLine className="text-white w-6 h-6" />
        </button>
      )}
      <h2 className="text-2xl font-semibold text-white">{props.title}</h2>
    </div>
  );
};

export default Header;
