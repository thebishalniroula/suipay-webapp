"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import useGetBalance from "@/hooks/use-get-balance";
import useSendSui from "@/hooks/use-send-sui";
import Spinner from "@/icons/spinner";
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

  const { control, handleSubmit, register, formState, reset } =
    useForm<SendSuiForm>({
      resolver: zodResolver(zSendSuiSchema),
      defaultValues: {
        amount: 0,
        toAddress: "",
      },
    });

  const onSubmit: SubmitHandler<SendSuiForm> = async (data) => {
    try {
      await sendSui({
        amount: data.amount,
        toAddress: data.toAddress,
      });
      toast.success("SUI sent successfully");
      reset();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex px-4">
      <form
        className="flex-1 pt-6 flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-transparent border border-[#47278C] rounded-3xl p-8 w-full max-w-[580px] flex flex-col items-center text-center">
          <Header title="Send Sui" onBack={() => router.push("/dashboard")} />
          <div className="w-full flex flex-col items-center gap-4">
            <div className="rounded-full bg-[#292E54] p-4 w-fit aspect-square flex items-center justify-center">
              <Image src="/sui.svg" alt="logo" width={69} height={69} />
            </div>

            <Input
              {...register("toAddress")}
              type="text"
              placeholder="Recipient’s Wallet Address"
              className="w-full"
            />

            <div className="w-full flex items-center border border-[#4f5170] rounded-[18px] pr-4">
              <Input
                type="number"
                className="w-full border-none focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none"
                placeholder="0.00"
                {...register("amount")}
              />
              <span className="text-white/50 mr-2 text-xl font-medium">
                SUI
              </span>
            </div>
          </div>

          <p className="text-sm text-red-500 mb-2">
            {formState.errors.amount?.message ??
              formState.errors.toAddress?.message}
          </p>

          <p className="w-full text-right text-[18px] font-normal text-white/90 mt-1 mb-5">
            Available: {balance?.balance ?? "0.00"} SUI
          </p>

          <div className="w-full">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                disabled={isSendingSui}
                onClick={() => router.push("/dashboard")}
                className="flex-1 uppercase rounded-[30px]"
              >
                {isSendingSui ? <Spinner /> : "Cancel"}
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSendingSui}
                className="flex-1 uppercase rounded-[30px]"
              >
                {isSendingSui ? <Spinner /> : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
