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

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function AccessPage() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
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
        Signup for a Smart Contract Wallet
      </h2>

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
                      className="bg-transparent border-[#A8A2F6] px-4  py-6 rounded-[15px] text-white placeholder:text-[#94ADC7] focus-visible:ring-[#6c63ff]/50"
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
                      className="bg-transparent border-[#A8A2F6] px-4  rounded-[15px]  py-6 text-white placeholder:text-[#94ADC7] focus-visible:ring-[#6c63ff]/50"
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
                      onChange={(e) => {
                        field.onChange(e);
                        setShowConfirmPassword(e.target.value.length > 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showConfirmPassword && (
              <Input
                placeholder="Re-enter Password"
                type="password"
                className="bg-transparent border-[#A8A2F6] px-4 rounded-[15px] py-6 text-white placeholder:text-[#94ADC7] focus-visible:ring-[#6c63ff]/50"
              />
            )}

            <Button
              type="submit"
              className="w-full bg-[#7E7AF2] hover:bg-[#5a52d5] text-white font-medium uppercase py-6 rounded-[15px]"
            >
              Sign Up
            </Button>
          </form>
        </Form>

        <Button
          type="button"
          variant="outline"
          className="w-full bg-transparent hover:bg-[#7E7AF2] text-white border-[#3d3d6d] mt-3 uppercase py-6 rounded-[15px]"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
