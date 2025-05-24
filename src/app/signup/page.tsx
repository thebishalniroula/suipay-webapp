"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import useSignUp from "@/hooks/use-sign-up";
import { deriveKeyPair, generateMnemonic } from "@/utils/create-address";
import { encryptData } from "@/utils/encryption";
import toast from "react-hot-toast";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import RecoveryPhrase from "@/components/ui/recovery-phrase";
import Spinner from "@/icons/spinner";

const formSchema = z
  .object({
    businessName: z.string().min(2, {
      message: "Business name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    repassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.repassword, {
    path: ["repassword"],
    message: "Passwords do not match.",
  });

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
      password: "",
      repassword: "",
    },
  });
  const signUpMutation = useSignUp();
  const { setPlain, setEncrypted } = useWalletEssentialsStore();

  const router = useRouter();
  const [step, setStep] = useState<"form" | "recovery">("form");

  const [mnemonic, setMnemonic] = useState<string>("");

  const handleContinue = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const mnemonic = generateMnemonic();
      const keyPair = await deriveKeyPair(mnemonic);
      const address = keyPair.getPublicKey().toSuiAddress();
      const privateKey = keyPair.getSecretKey();
      const publicKey = keyPair.getPublicKey().toBase64();

      const encryptedPrivateKey = await encryptData(privateKey, data.password);
      const encryptedMnemonic = await encryptData(mnemonic, data.password);

      const res = await signUpMutation.mutateAsync({
        id: address,
        businessName: data.businessName,
        email: data.email,
        password: data.password,
      });

      setPlain({
        address,
        publicKey,
        accessToken: res.accessToken,
        scwAddress: res.user.wallet,
      });

      setEncrypted({
        privateKey: encryptedPrivateKey,
        mnemonic: encryptedMnemonic,
      });

      setMnemonic(mnemonic);

      setStep("recovery");

      toast.success("Signup successful!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-1">
      <div className="mb-3">
        <div className="flex items-center gap-2 text-sm text-[#ffffff] px-3 py-1">
          <Image src="/sui.svg" alt="logo" width={14} height={18} />
          Built on Sui
        </div>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">SuiPay</h1>

      <h2 className="text-xl md:text-2xl text-white mb-10">
        Signup for a Smart Contract Wallet
      </h2>

      {step === "recovery" && mnemonic ? (
        <div className="max-w-md w-full rounded-3xl border-[#4F4AED] border">
          <RecoveryPhrase phrase={mnemonic} handleContinue={handleContinue} />
        </div>
      ) : (
        <div className="bg-transparent border border-[#4F4AED] rounded-3xl p-8 w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Business Name"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        type="email"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Re-enter Password"
                        type="password"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={signUpMutation.isPending}
                className="w-full uppercase"
              >
                {signUpMutation.isPending ? <Spinner /> : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-white text-sm">Already have a wallet?</div>
          <Link href="/signin">
            <Button
              type="button"
              size="md"
              variant="outline"
              className="w-full bg-transparent hover:bg-[#7E7AF2] text-white border-[#3d3d6d] mt-3 uppercase py-6 rounded-[15px]"
            >
              Sign In
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
