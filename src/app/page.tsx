"use client";
import NeumonicCard from "./components/NeumonicCard";
import { useMediaQuery } from "./api/hooks/useMediaQuery";
import Image from "next/image";
import Solana from "../../public/Solana.svg";

export default function Home() {
  const mediaquery = useMediaQuery(786);
  return (
    <div className='flex justify-center items-center align-middle flex-col mt-14 bg-black text-white'>
      <span className='md:text-4xl md:flex justify-center align-middle items-center text-center gap-3'>
        <Image
          className='flex h-11 w-[20rem] '
          width={500}
          height={50}
          src={Solana}
          alt=''
        />

        <span className='text-5xl font-extrabold'>Wallet Generate</span>
      </span>
      <NeumonicCard />
    </div>
  );
}
