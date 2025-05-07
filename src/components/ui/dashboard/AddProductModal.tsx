"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { X } from "lucide-react";
import { useState } from "react";

export default function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [subscriptionType, setSubscriptionType] = useState("onetime");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border-2 border-[#1F173F] rounded-2xl flex flex-col items-center justify-center p-8 bg-transparent text-white cursor-pointer hover:border-[#6c63ff] transition">
          <div className="p-6 rounded-lg">
            <span className="text-3xl">
              <GoPlus />
            </span>
          </div>
          <p className="text-lg font-medium">Add a Product</p>
        </div>
      </DialogTrigger>

      <DialogContent className="bg-transparent text-white border border-[#8B5CF6] rounded-2xl max-w-sm">
        <DialogHeader className="flex justify-between">
          <DialogTitle className="text-white text-xl">
            Add New Product
          </DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <input
            placeholder="Name of the product"
            className="w-full bg-transparent border border-[#2C2E4A] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none"
          />
          <input
            placeholder="Price"
            type="number"
            className="w-full bg-transparent border border-[#2C2E4A] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none"
          />

          <button className="w-full text-[#8B5CF6] border bg-[#12112B] border-[#2C2E4A] px-4 py-3 rounded-lg hover:bg-[#1a1a2e] transition">
            + Link Web hook
          </button>

          <div>
            <p className="font-medium mb-2">Type of subscription</p>
            <div className="flex gap-4">
              {["onetime", "subscription"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-lg border ${
                    subscriptionType === type
                      ? "border-[#8B5CF6] bg-[#1a1a2e]"
                      : "border-[#2C2E4A]"
                  } cursor-pointer transition`}
                >
                  <input
                    type="radio"
                    name="subscriptionType"
                    value={type}
                    checked={subscriptionType === type}
                    onChange={() => setSubscriptionType(type)}
                    className="accent-[#8B5CF6] w-4 h-4"
                  />
                  <span className="text-white capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {subscriptionType === "subscription" && (
            <div className="relative">
              <input
                placeholder="Enter duration"
                type="number"
                className="w-full bg-transparent border border-[#8B5CF6] text-white placeholder-gray-400 px-4 py-3 pr-28 rounded-lg focus:outline-none"
              />
              <select className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent text-white px-2 py-1 focus:outline-none">
                <option value="month" className="bg-[#0f0f1a] text-white">
                  Month
                </option>
                <option value="year" className="bg-[#0f0f1a] text-white">
                  Year
                </option>
              </select>
            </div>
          )}

          <Button className="w-full bg-[#7E7AF2] hover:bg-[#7a4ee6] rounded-lg py-6 text-white">
            Add Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
