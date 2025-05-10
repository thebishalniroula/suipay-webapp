"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Eye, EyeOff } from "lucide-react";
import { Webhook } from "@/hooks/use-get-webhooks";

export default function WebhookCard({ hook }: { hook: Webhook }) {
  const [visible, setVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hook.secret);
  };

  const handleToggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="relative w-[300px] rounded-2xl border border-[#4B3F99] bg-[#0D0D19] text-white p-5 space-y-3 pb-3 h-auto">
      <div className="absolute top-3 right-3">
        <Button variant="ghost" size="icon" className="text-white p-1">
          <X size={16} />
        </Button>
      </div>

      <div>
        <p className="text-sm text-[#7E7AF2] mb-1">Url</p>
        <p className="text-base font-medium break-words leading-snug">
          {hook.url}
        </p>
      </div>

      <div>
        <p className="text-sm text-[#7E7AF2] mb-0">Secret Key</p>
        <div className="flex items-center gap-2">
          <p className="flex-1 truncate text-sm font-mono">
            {visible ? hook.secret : "************************"}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 bg-[#2D2A5F] hover:bg-[#3E3A74]"
              onClick={handleToggleVisibility}
            >
              {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
            <Button
              size="sm"
              onClick={handleCopy}
              className="bg-[#2D2A5F] hover:bg-[#7a4ee6] h-[37px] rounded-lg px-4 text-sm font-medium"
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
