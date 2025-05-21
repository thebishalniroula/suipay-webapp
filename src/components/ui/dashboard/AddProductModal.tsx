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
import { useSuiClient } from "@mysten/dapp-kit";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/config/query-keys";
import { MIST_PER_SUI } from "@mysten/sui/utils";
import Spinner from "@/icons/spinner";
import { Input } from "../input";
import { cn } from "@/lib/utils";

const getDurationInSeconds = (value: string, unit: string): number => {
  const num = parseInt(value, 10);
  const multipliers: Record<string, number> = {
    Minutes: 60,
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
  const queryClient = useQueryClient();
  const addProduct = async (product: AddProductParams) => {
    try {
      const res = await addProductMutation.mutateAsync(product);
      toast.success("Product created successfully");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCTS],
      });
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleAddProduct = async () => {
    try {
      console.log("adding prod");

      if (!name.trim()) {
        toast.error("Product name is required.");
        return;
      }
      console.log("adding prod2");

      const parsedPrice = parseFloat(price);
      if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
        toast.error("Enter a valid price.");
        return;
      }
      console.log("adding prod3");

      const priceInMist = BigInt(
        Math.round(parsedPrice * Number(MIST_PER_SUI))
      );
      const recurringPeriod =
        subscriptionType === "subscription"
          ? getDurationInSeconds(duration, durationUnit)
          : 0;
      console.log("adding prod4");

      const res = await addProductMutation.mutateAsync({
        name,
        price: priceInMist.toString(),
        recurringPeriod,
      });

      const productId = res?.product.id;
      const webhookid = linkedWebhook;
      if (productId && webhookid) {
        console.log("Finally adding");
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
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
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
            <DialogTitle className="text-white">Add New Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-1">
            <Input
              placeholder="Name of the product"
              className="w-full "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Price"
              type="number"
              className="w-full "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {price && (
              <p className="text-xs text-gray-400 px-1">
                ≈ {(parseFloat(price) * Number(MIST_PER_SUI)).toLocaleString()}{" "}
                MIST
              </p>
            )}

            {linkedWebhook ? (
              <div className="flex gap-2 items-center bg-[#1E1D33] border border-[#8B5CF6] px-4 py-3 rounded-lg w-full max-w-full">
                <span className="text-[#7E7AF2] font-medium break-all text-base flex-1">
                  {data?.webhooks.find((w) => w.id === linkedWebhook)?.url ??
                    "Webhook not found"}
                </span>
                <Button
                  onClick={() => setLinkedWebhook(null)}
                  className="text-sm font-normal px-3 py-2 border rounded-md h-fit"
                  variant="outline"
                >
                  Unlink
                </Button>
              </div>
            ) : (
              <Input
                readOnly
                onClick={() => setIsWebhookDialogOpen(true)}
                className="w-full text-[#8B5CF6] border bg-[#12112B] border-[#2C2E4A] px-4 cursor-pointer break-all hover:bg-[#1a1a2e] transition h-[79px] rounded-[20px]"
                value={"+ Link Web hook"}
              />
            )}

            <div>
              <p className="font-medium text-[18px] mb-3">
                Type of subscription
              </p>
              <div className="flex gap-4">
                {["onetime", "subscription"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center justify-center gap-2 flex-1 py-1 rounded-lg border ${
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
                      className="accent-[#8B5CF6] w-4 h-[49px]"
                    />
                    <span className="text-white capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {subscriptionType === "subscription" && (
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    placeholder="Enter duration"
                    type="number"
                    className="w-full border-[#8B5CF6] text-white placeholder-gray-400 px-4 py-3 pr-28 rounded-lg h-[49px] focus-visible:ring-0"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  {!showUnits && (
                    <Button
                      rightIcon={<MdOutlineKeyboardArrowDown />}
                      type="button"
                      size="sm"
                      onClick={() => setShowUnits(true)}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent hover:bg-transparent text-white px-2 py-1 flex items-center gap-1"
                    >
                      {durationUnit}
                    </Button>
                  )}
                </div>

                {
                  <div
                    className={cn(
                      "flex justify-between gap-2 mt-4 h-0 overflow-hidden",
                      showUnits && "h-[45px]",
                      "transition-all duration-200 ease-in-out"
                    )}
                  >
                    {["Minutes", "Days", "Month", "Year"].map((unit) => (
                      <label
                        key={unit}
                        className={`flex items-center justify-center flex-1 border rounded-lg px-3 py-2 text-base capitalize cursor-pointer transition ${
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
                }
              </div>
            )}
          </div>
          <Button
            onClick={handleAddProduct}
            variant="primary"
            size="md"
            className="w-full uppercase flex items-center justify-center gap-2"
            disabled={
              addProductMutation.isPending ||
              linkProductWebhookMutation.isPending
            }
          >
            {(addProductMutation.isPending ||
              linkProductWebhookMutation.isPending) && <Spinner />}
            {addProductMutation.isPending
              ? "Adding..."
              : linkProductWebhookMutation.isPending
              ? "Linking..."
              : "Add Product"}
          </Button>
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
                className="flex gap-3 items-center rounded-lg px-4 py-3 border border-[#2C2E4A]"
              >
                <span className="text-white font-medium break-all text-base flex-1">
                  {hook.url}
                </span>
                <Button
                  variant="outline"
                  className="font-normal px-3 py-2 text-sm rounded-md h-fit"
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
