// Utility functions
const str2ab = (str: string): Uint8Array => new TextEncoder().encode(str);
const ab2str = (buf: ArrayBuffer): string => new TextDecoder().decode(buf);
const ab2b64 = (buf: ArrayBuffer): string =>
  btoa(String.fromCharCode(...new Uint8Array(buf)));
const b64toab = (b64: string): ArrayBuffer =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer;

// Derive a key from the password and salt
async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    str2ab(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export type EncryptedData = {
  ciphertext: string;
  salt: string;
  iv: string;
};

// Encrypt data
export async function encryptData(
  plaintext: string,
  password: string
): Promise<EncryptedData> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    str2ab(plaintext)
  );

  return {
    ciphertext: ab2b64(encrypted),
    salt: ab2b64(salt.buffer),
    iv: ab2b64(iv.buffer),
  };
}

// Decrypt data
export async function decryptData(
  encryptedData: EncryptedData,
  password: string
): Promise<string> {
  const salt = new Uint8Array(b64toab(encryptedData.salt));
  const iv = new Uint8Array(b64toab(encryptedData.iv));
  const ciphertext = b64toab(encryptedData.ciphertext);
  const key = await deriveKey(password, salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    ciphertext
  );

  return ab2str(decrypted);
}
