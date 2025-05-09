import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";

const DEFAULT_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";

// 1. Generate Mnemonic
export function generateMnemonic(): string {
  const mnemonics = bip39.generateMnemonic(wordlist);
  return mnemonics;
}

// 2. Generate Private Key
export async function deriveKeyPair(mnemonics: string) {
  const ed25519 = Ed25519Keypair.deriveKeypair(
    mnemonics,
    DEFAULT_DERIVATION_PATH
  );
  return ed25519;
}
