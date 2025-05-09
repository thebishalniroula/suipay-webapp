"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddBox from "@/components/AddBox";

export default function AddWebhookModal({
  onAddWebhook,
}: {
  onAddWebhook: (hook: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (!url) return;

    const secretKey = Array(40).fill("*").join("");
    onAddWebhook({ url, id: crypto.randomUUID(), secretKey });
    setUrl("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!isOpen && (
        <DialogTrigger asChild>
          <AddBox label="Add a Hook" onClick={() => setIsOpen(true)} />
        </DialogTrigger>
      )}

      <DialogContent className="bg-[#0D0D19] text-white border border-[#8B5CF6] rounded-2xl max-w-lg w-full">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-lg">Add a Hook</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mt-4">
          <input
            placeholder="Enter Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent border border-[#2C2E4A] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none"
          />
          <Button
            onClick={handleAdd}
            className="bg-[#7E7AF2] h-[49px] hover:bg-[#7a4ee6] rounded-lg px-4 py-[0.6875rem]"
          >
            Generate Key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
