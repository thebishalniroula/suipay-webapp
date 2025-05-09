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
import toast from "react-hot-toast";
import useAddWebhook from "@/hooks/use-add-webhook";

export default function AddWebhookModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [url, setUrl] = useState("");
  const addHookMut = useAddWebhook();

  const addHook = async (hook: string) => {
    try {
      const res = await addHookMut.mutateAsync(hook);
      console.log(res);
      toast.success("Webhook added successfully");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleAdd = () => {
    if (!url) return;
    addHook(url);
    setUrl("");
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

        <form className="flex gap-2 mt-4">
          <input
            placeholder="Enter Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent border border-[#2C2E4A] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none"
          />
          <Button
            type="button"
            onClick={handleAdd}
            className="bg-[#7E7AF2] h-[49px] hover:bg-[#7a4ee6] rounded-lg px-4 py-[0.6875rem]"
          >
            {addHookMut.isPending ? "Generating" : "Generate Key"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
