// components/ui/AddBox.tsx
"use client";
import { GoPlus } from "react-icons/go";

export default function AddBox({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="w-[300px] border-2 border-[#1F173F] rounded-2xl flex flex-col items-center justify-center p-8 bg-transparent text-white cursor-pointer hover:border-[#6c63ff] transition"
    >
      <div className="p-4 rounded-lg">
        <span className="text-3xl">
          <GoPlus />
        </span>
      </div>
      <p className="text-lg font-medium">{label}</p>
    </div>
  );
}
