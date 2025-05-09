"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Eye, EyeOff } from "lucide-react";

export default function WebhookCard({ hook }: { hook: any }) {
  const [visible, setVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hook.secretKey);
  };

  const handleToggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="rounded-2xl border border-[#4B3F99] bg-[#0D0D19] text-white p-5 w-[300px] space-y-2 relative">
      <div className="absolute top-3 right-3">
        <Button variant="ghost" size="icon" className="text-white">
          <X size={16} />
        </Button>
      </div>

      <div>
        <p className="text-sm text-[#7E7AF2]">Url</p>
        <p className="text-base font-medium break-words">{hook.url}</p>
      </div>

      <div>
        <p className="text-sm text-[#7E7AF2]">Secret Key</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="flex-1 truncate">{visible ? hook.secretKey : ""}</p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 bg-[#2D2A5F]"
              onClick={handleToggleVisibility}
            >
              {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
            <Button
              size="sm"
              onClick={handleCopy}
              className="bg-[#2D2A5F] h-[33px] hover:bg-[#7a4ee6] rounded-lg px-4 py-[0.6875rem]"
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
