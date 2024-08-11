"use client";
import NeumonicCard from "./components/NeumonicCard";
import { useMediaQuery } from "./api/hooks/useMediaQuery";

export default function Home() {
  const mediaquery = useMediaQuery(786);
  return (
    <div className='flex justify-center items-center align-middle'>
      {mediaquery ? "Not for Phone Browser, open in PC" : <NeumonicCard />}
    </div>
  );
}
