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
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import AddBox from "@/components/AddBox";
import { AddProductParams } from "@/hooks/use-add-product";

export default function AddProductModal({
  onAddProduct,
  open,
  setOpen,
}: {
  onAddProduct: (product: AddProductParams) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [linkedWebhook, setLinkedWebhook] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isWebhookDialogOpen, setIsWebhookDialogOpen] = useState(false);
  const [durationUnit, setDurationUnit] = useState("Month");
  const [showUnits, setShowUnits] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("onetime");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const webhooks = ["Youtube", "Spotify", "Softflix", "Supermoon"];

  const handleAddProduct = () => {
    if (!name || !price) return;

    onAddProduct({
      name,
      price,
      recurringPeriod: +duration,

      // this does not need to be passed here, instead calculate duration in seconds and pass the duration in seconds in above recurringPeriod paramerter
      // durationUnit,

      // this has not been implemented yet in the backend
      // webhook: linkedWebhook,
    });

    setIsOpen(false);
    setName("");
    setPrice("");
    setDuration("");
    setLinkedWebhook(null);
    setSubscriptionType("onetime");
    setDurationUnit("Month");
    setShowUnits(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {!isOpen && (
          <DialogTrigger asChild>
            <AddBox label="Add a Product" onClick={() => {}} />
          </DialogTrigger>
        )}

        <DialogContent className="bg-[#0D0D19] text-white border border-[#8B5CF6] rounded-2xl max-w-sm">
          <DialogHeader className="flex justify-between">
            <DialogTitle className="text-white text-xl">
              Add New Product
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <input
              placeholder="Name of the product"
              className="w-full bg-transparent border border-[#2C2E4A] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Price"
              type="number"
              className="w-full bg-transparent border border-[#2C2E4A] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {linkedWebhook ? (
              <div className="flex justify-between items-center bg-[#1E1D33] border border-[#8B5CF6] px-4 py-3 rounded-lg">
                <span className="text-[#7E7AF2] font-medium">
                  {linkedWebhook}
                </span>
                <Button
                  onClick={() => setLinkedWebhook(null)}
                  className="text-sm px-3 py-1 border border-[#8B5CF6] text-white hover:bg-[#2a2655] rounded-md"
                  variant="ghost"
                >
                  Unlink
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsWebhookDialogOpen(true)}
                className="w-full text-[#8B5CF6] border bg-[#12112B] border-[#2C2E4A] px-4 py-3 cursor-pointer rounded-lg hover:bg-[#1a1a2e] transition"
              >
                + Link Web hook
              </Button>
            )}

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
              <div className="space-y-2">
                <div className="relative">
                  <input
                    placeholder="Enter duration"
                    type="number"
                    className="w-full bg-transparent border border-[#8B5CF6] text-white placeholder-gray-400 px-4 py-3 pr-28 rounded-lg focus:outline-none"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  {!showUnits && (
                    <Button
                      type="button"
                      onClick={() => setShowUnits(true)}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent text-white px-2 py-1 focus:outline-none flex items-center gap-1"
                    >
                      {durationUnit}
                      <MdOutlineKeyboardArrowDown />
                    </Button>
                  )}
                </div>

                {showUnits && (
                  <div className="flex justify-between gap-2 px-1">
                    {["Min", "Days", "Month", "Year"].map((unit) => (
                      <label
                        key={unit}
                        className={`flex items-center justify-center flex-1 border rounded-lg px-3 py-2 text-sm capitalize cursor-pointer transition ${
                          durationUnit === unit
                            ? "border-[#8B5CF6] bg-[#1a1a2e] text-white"
                            : "border-[#2C2E4A] text-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="durationUnit"
                          value={unit}
                          checked={durationUnit === unit}
                          onChange={() => {
                            setDurationUnit(unit);
                            setShowUnits(false);
                          }}
                          className="accent-[#8B5CF6] mr-2"
                        />
                        {unit}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={handleAddProduct}
              className="w-full bg-[#7E7AF2] hover:bg-[#7a4ee6] rounded-lg py-6 text-white"
            >
              Add Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isWebhookDialogOpen} onOpenChange={setIsWebhookDialogOpen}>
        <DialogContent className="backdrop-blur-sm bg-[#12112B]/80 text-white border border-[#8B5CF6] rounded-xl max-w-xs">
          <DialogHeader className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg text-white">Web Hooks</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {webhooks.map((hook) => (
              <div
                key={hook}
                className="flex justify-between items-center bg-transparent rounded-lg px-4 py-3 border border-[#2C2E4A]"
              >
                <span className="text-white font-medium">{hook}</span>
                <Button
                  variant="ghost"
                  className="border cursor-pointer border-[#8B5CF6] text-white hover:bg-[#2a2655] px-3 py-1 text-sm rounded-md"
                  onClick={() => {
                    setLinkedWebhook(hook);
                    setIsWebhookDialogOpen(false);
                  }}
                >
                  Link
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
