import { NextResponse } from "next/server";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

export async function POST(request: Request) {
  try {
    const { mnemonicWords, walletIndex } = await request.json();

    const mnemonic = mnemonicWords.join(" ");
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${walletIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
    const publicKey = new PublicKey(keyPair.publicKey).toBase58();

    return NextResponse.json({ publicKey });
  } catch (error) {
    console.error("Error generating wallet:", error);
    return NextResponse.json(
      { error: "Failed to generate wallet" },
      { status: 400 }
    );
  }
}
