"use client";

import { Button } from "@/components/ui/button";
import useGetBalance from "@/hooks/use-get-balance";
import useSendSui from "@/hooks/use-send-sui";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiArrowLeftSLine } from "react-icons/ri";
import { z } from "zod";

const zSendSuiSchema = z.object({
  amount: z.number(),
  toAddress: z.string().min(1),
});

type SendSuiForm = z.infer<typeof zSendSuiSchema>;

export default function Dashboard() {
  const router = useRouter();
  const {
    plain: { address },
  } = useWalletEssentialsStore();
  const { data: balance } = useGetBalance(address);
  const { mutateAsync: sendSui, isPending: isSendingSui } = useSendSui();
  const { control, handleSubmit, register, formState, reset } = useForm({
    resolver: zodResolver(zSendSuiSchema),
    defaultValues: {
      amount: 0,
      toAddress: "",
    },
  });
  const onSubmit: SubmitHandler<SendSuiForm> = async (data) => {
    try {
      const res = await sendSui({
        amount: data.amount,
        toAddress: data.toAddress,
      });
      toast.success("Sui sent successfully");
      reset();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      <form
        className="flex-1 pt-6 px-4 flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-transparent border border-[#47278C] rounded-3xl p-8 w-full max-w-md flex flex-col items-center text-center">
          <div className="relative w-full flex items-center justify-center mb-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="absolute left-0 cursor-pointer"
            >
              <RiArrowLeftSLine className="text-white w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold text-white">Send Sui</h2>
          </div>

          <div className="mb-6 rounded-full bg-[#292E54] p-4">
            <Image src="/sui.svg" alt="logo" width={69} height={91} />
          </div>

          <input
            {...register("toAddress")}
            type="text"
            placeholder="Recipient’s Wallet Address"
            className="w-full bg-transparent border border-[#2C2E4A] rounded-lg py-3 px-4 text-white placeholder-gray-400 mb-2 focus:outline-none"
          />

          <div className="w-full flex items-center border border-[#2C2E4A] rounded-lg px-4 mb-2">
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <input
                  type="number"
                  // pattern="^\d+(\.\d+)?$"
                  className="flex-1 bg-transparent py-3 text-white placeholder-gray-400 focus:outline-none"
                  {...field}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    field.onChange(+inputValue);
                  }}
                />
              )}
            />
            <span className="text-white mr-2">SUI</span>
            {/* <Button className="text-sm text-white bg-[#3A3C5B] px-2 py-1 rounded-md hover:bg-[#5a52d5]">
              Max
            </Button> */}
          </div>
          <p className="text-sm text-red-500 mb-2">
            {formState.errors.amount?.message ??
              formState.errors.toAddress?.message}
          </p>

          <p className="w-full text-right text-sm text-white mb-6">
            Available: {balance?.balance} SUI
          </p>

          <div className="flex w-full gap-4">
            <Button
              disabled={isSendingSui}
              onClick={() => router.push("/dashboard")}
              className="flex-1 bg-[#CFC4E7] text-black font-semibold py-6 px-4 rounded-lg hover:bg-[#b9aee2] transition-colors duration-200"
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={isSendingSui}
              type="submit"
              className="flex-1 bg-[#6c63ff] text-white font-semibold py-6 px-4 rounded-lg hover:bg-[#5a52d5] transition-colors duration-200"
            >
              {isSendingSui ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
