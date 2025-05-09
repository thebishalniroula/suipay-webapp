"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";

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
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { storeEncryptedWalletCookie } from "@/lib/cookies";

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

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
      password: "",
      repassword: "",
    },
  });

  async function encryptMnemonic(mnemonic: any, password: any) {
    // Generate a random salt
    const salt = crypto.getRandomValues(new Uint8Array(16));

    // Derive encryption key from password using PBKDF2
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      passwordData,
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    // Create encryption key with many iterations for security
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    // Generate random IV for AES-GCM
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the mnemonic
    const mnemonicData = encoder.encode(mnemonic);
    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      mnemonicData
    );

    // Return encrypted data with salt and IV for decryption later
    return {
      encryptedData: new Uint8Array(encryptedData),
      salt,
      iv,
      createdAt: Date.now(), // Timestamp for session expiry
    };
  }

  // Function to decrypt the mnemonic
  async function decryptMnemonic(encryptedObj: any, password: any) {
    const { encryptedData, salt, iv, createdAt } = encryptedObj;

    const saltBuffer = new Uint8Array(salt);
    const ivBuffer = new Uint8Array(iv);
    const encryptedBuffer = new Uint8Array(encryptedData);

    // Check if session has expired (e.g., 5-minute session)
    const sessionDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (Date.now() - createdAt > sessionDuration) {
      throw new Error("Session expired");
    }

    // Derive the same key from password
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      passwordData,
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: saltBuffer,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivBuffer },
      key,
      encryptedBuffer.buffer
    );

    // Convert back to string
    return new TextDecoder().decode(decryptedData);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(storeEncryptedWalletCookie, "kxa");
    setIsLoading(true);
    try {
      const mnemonics = bip39.generateMnemonic(wordlist);
      const ed25519 = Ed25519Keypair.deriveKeypair(
        mnemonics,
        "m/44'/784'/0'/0'/0'"
      );
      const secretKey = ed25519.getSecretKey();

      const encryptedData = await encryptMnemonic(secretKey, values.password);

      await fetch("/api/encrypted-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encryptedData }),
      });

      // Optional: mock signup delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Sign up successful!");
      console.log("Encrypted wallet stored in cookie.");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  console.log(storeEncryptedWalletCookie, "kxa");

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
              <FormField
                control={form.control}
                name="repassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Re-enter Password"
                        type="password"
                        className="bg-transparent border-[#A8A2F6] px-4 rounded-[15px] py-6 text-white placeholder:text-[#94ADC7] focus-visible:ring-[#6c63ff]/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7E7AF2] hover:bg-[#5a52d5] text-white font-medium uppercase py-6 rounded-[15px] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-white text-sm">Already have a wallet?</div>
        <Link href="/signin">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent hover:bg-[#7E7AF2] text-white border-[#3d3d6d] mt-3 uppercase py-6 rounded-[15px]"
          >
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
