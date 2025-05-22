// lib/cookies.ts
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { safeParseJSON } from "./utils";

type EncryptedWallet = {
  encryptedData: Uint8Array;
  salt: Uint8Array;
  iv: Uint8Array;
  createdAt: number;
};

export function storeEncryptedWalletCookie(
  data: EncryptedWallet,
  options: { req?: any; res?: any } = {}
) {
  const serialized = JSON.stringify({
    encryptedData: Array.from(data.encryptedData),
    salt: Array.from(data.salt),
    iv: Array.from(data.iv),
    createdAt: data.createdAt,
  });

  setCookie("sui_encrypted_wallet", serialized, {
    maxAge: 300, // 5 minutes
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    ...options,
  });
}

export function getEncryptedWalletCookie(
  options: { req?: any; res?: any } = {}
): EncryptedWallet | null {
  const cookie = getCookie("sui_encrypted_wallet", options);
  if (!cookie) return null;

  try {
    const parsed = safeParseJSON(cookie as string);
    return {
      encryptedData: new Uint8Array(parsed.encryptedData),
      salt: new Uint8Array(parsed.salt),
      iv: new Uint8Array(parsed.iv),
      createdAt: parsed.createdAt,
    };
  } catch {
    return null;
  }
}

export function clearEncryptedWalletCookie(
  options: { req?: any; res?: any } = {}
) {
  deleteCookie("sui_encrypted_wallet", { path: "/", ...options });
}
