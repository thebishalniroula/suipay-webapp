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
import useAddProduct, { AddProductParams } from "@/hooks/use-add-product";
import useGetWebhooks from "@/hooks/use-get-webhooks";
import toast from "react-hot-toast";
import useLinkProductWebhook from "@/hooks/use-link-product-webhook";

const getDurationInSeconds = (value: string, unit: string): number => {
  const num = parseInt(value, 10);
  const multipliers: Record<string, number> = {
    Min: 60,
    Days: 86400,
    Month: 2592000,
    Year: 31536000,
  };
  return num * (multipliers[unit] || 0);
};

export default function AddProductModal({
  open,
  setOpen,
}: {
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

  const { data } = useGetWebhooks();

  const addProductMutation = useAddProduct();

  const linkProductWebhookMutation = useLinkProductWebhook();

  const addProduct = async (product: AddProductParams) => {
    try {
      const res = await addProductMutation.mutateAsync(product);
      toast.success("Product created successfully");
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleAddProduct = async () => {
    try {
      if (!name.trim()) {
        toast.error("Product name is required.");
        return;
      }

      const parsedPrice = parseFloat(price);
      if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
        toast.error("Enter a valid price.");
        return;
      }

      const priceInMist = parseFloat(price) * 1_000_000_000;
      const recurringPeriod =
        subscriptionType === "subscription"
          ? getDurationInSeconds(duration, durationUnit)
          : 0;

      const res = await addProductMutation.mutateAsync({
        name,
        price: priceInMist.toString(),
        recurringPeriod,
      });

      // this does not need to be passed here, instead calculate duration in seconds and pass the duration in seconds in above recurringPeriod paramerter
      // durationUnit,

      const productId = res?.product.id;
      const webhookid = linkedWebhook;

      if (productId && webhookid) {
        await linkProductWebhookMutation.mutateAsync({
          productId,
          webhookId: webhookid,
        });
      }

      toast.success("Linked to webhook successfully");

      setIsOpen(false);
      setName("");
      setPrice("");
      setDuration("");
      setLinkedWebhook(null);
      setSubscriptionType("onetime");
      setDurationUnit("Month");
      setShowUnits(false);
    } catch (error) {}
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
            {price && (
              <p className="text-xs text-gray-400 px-1">
                ≈ {(parseFloat(price) * 1_000_000_000).toLocaleString()} MIST
              </p>
            )}

            {linkedWebhook ? (
              <div className="flex gap-2 items-start bg-[#1E1D33] border border-[#8B5CF6] px-4 py-3 rounded-lg w-full max-w-full">
                <span className="text-[#7E7AF2] font-medium break-all text-sm flex-1">
                  {data?.webhooks.find((w) => w.id === linkedWebhook)?.url ??
                    "Webhook not found"}
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
                className="w-full text-[#8B5CF6] border bg-[#12112B] border-[#2C2E4A] px-4 py-3 cursor-pointer break-all rounded-lg hover:bg-[#1a1a2e] transition"
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
              className="w-full bg-[#7E7AF2] hover:bg-[#7a4ee6] rounded-lg py-6 text-white cursor-pointer"
            >
              {addProductMutation.isPending
                ? "Adding..."
                : linkProductWebhookMutation.isPending
                ? "Linking..."
                : "Add Product"}

              {linkProductWebhookMutation.isPending &&
                !linkProductWebhookMutation.isPending &&
                "Linking..."}
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
            {data?.webhooks.map((hook, index) => (
              <div
                key={hook.url + index}
                className="flex gap-3 items-start bg-transparent rounded-lg px-4 py-3 border border-[#2C2E4A]"
              >
                <span className="text-white font-medium break-all text-sm flex-1">
                  {hook.url}
                </span>
                <Button
                  variant="ghost"
                  className="border cursor-pointer border-[#8B5CF6] text-white hover:bg-[#2a2655] px-3 py-1 text-sm rounded-md"
                  onClick={() => {
                    setLinkedWebhook(hook.id);
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
