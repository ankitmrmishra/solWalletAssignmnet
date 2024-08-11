import Image from "next/image";
import NeumonicCard from "./components/NeumonicCard";

export default function Home() {
  return (
    <div className='flex justify-center items-center align-middle'>
      <NeumonicCard />
    </div>
  );
}
