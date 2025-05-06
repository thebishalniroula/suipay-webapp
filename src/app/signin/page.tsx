"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  seedphrase: z.string().min(2, {
    message: "seedphrase must be written",
  }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seedphrase: "",

      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
                      placeholder="Enter your Seed Phrase..."
                      className="bg-transparent border border-[#A8A2F6] px-4 pt-4 pb-2 rounded-[15px] text-white placeholder:text-[#94ADC7] focus-visible:ring-[#6c63ff]/50 resize-none"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      className="bg-transparent border-[#A8A2F6] px-4  rounded-[15px]  py-6 text-white placeholder:text-[#94ADC7] focus-visible:ring-[#6c63ff]/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="/dashboard">
              <Button
                type="submit"
                className="w-full bg-[#7E7AF2] hover:bg-[#5a52d5] text-white font-medium uppercase py-6 rounded-[15px]"
              >
                Sign In
              </Button>
            </Link>
          </form>
        </Form>
        <div className="mt-4 text-white text-sm">
          Dont &apos;t have a wallet?
        </div>
        <Link href="/signup">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent hover:bg-[#7E7AF2] text-white border-[#3d3d6d] mt-3 uppercase py-6 rounded-[15px]"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
