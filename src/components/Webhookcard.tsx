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
      {/* <div className="absolute top-3 right-3">
        <Button className="text-white p-1 aspect-square">
          <X size={16} />
        </Button>
      </div> */}

      <div>
        <p className="text-base text-[#7E7AF2] mb-1">URL</p>
        <p className="text-base font-medium break-words leading-snug">
          {hook.url}
        </p>
      </div>

      <div>
        <p className="text-base text-[#7E7AF2] mb-0">Secret Key</p>
        <div className="flex items-center gap-4">
          <p className="flex-1 truncate text-sm font-mono">
            {visible ? hook.secret : "*******************"}
          </p>
          <div className="flex items-center gap-3 select-none">
            <div onClick={handleToggleVisibility}>
              {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>
            <span onClick={handleCopy}>Copy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
