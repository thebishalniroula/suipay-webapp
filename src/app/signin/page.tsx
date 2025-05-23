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
import { Textarea } from "@/components/ui/textarea";
import useSignIn from "@/hooks/use-sign-in";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { deriveKeyPair } from "@/utils/create-address";
import { encryptData } from "@/utils/encryption";
import Spinner from "@/icons/spinner";
import { setCookie } from "cookies-next";

const formSchema = z.object({
  seedphrase: z.string().min(2, {
    message: "Seed phrase must be written",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const signInMutation = useSignIn();

  const router = useRouter();

  const { setPlain, setEncrypted } = useWalletEssentialsStore();

  console.log(form.formState.errors);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    console.log({ values });
    try {
      const keyPair = await deriveKeyPair(values.seedphrase);
      const address = keyPair.getPublicKey().toSuiAddress();
      const privateKey = keyPair.getSecretKey();
      const publicKey = keyPair.getPublicKey().toBase64();

      const encryptedPrivateKey = await encryptData(
        privateKey,
        values.password
      );
      const encryptedMnemonic = await encryptData(
        values.seedphrase,
        values.password
      );

      const res = await signInMutation.mutateAsync({
        id: address,
        email: values.email,
        password: values.password,
      });

      // Set state
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

      toast.success("Signin successful!");

      window.open("/dashboard", "_blank");
    } catch (error) {
      console.log(error);
      toast.error("Signin failed!");
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
        Signin for a Smart Contract Wallet
      </h2>

      <div className="bg-transparent border border-[#4F4AED] rounded-3xl p-8 w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="seedphrase"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Seedphrase"
                      className="h-[80px]"
                      rows={4}
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
                      placeholder="ex@mple.com"
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
              className="w-full uppercase flex items-center justify-center gap-2"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending && <Spinner />}
              {signInMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-white text-sm">
          Dont &apos;t have a wallet?
        </div>
        <Link href="/signup">
          <Button
            type="button"
            variant="outline"
            size="md"
            className="w-full uppercase mt-3"
          >
            SIGN UP
          </Button>
        </Link>
      </div>
    </div>
  );
}
