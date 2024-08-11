"use client";
import React from "react";
import { generateMnemonic } from "bip39";
import { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa6";

const NeumonicCard = () => {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([
    ...Array(12).fill(""),
  ]);
  const [mnemonicWordsGen, setMnemonicWordsgen] = useState(false);
  const [wallets, setWallets] = useState<string[]>([]);

  const [stringifiedMnenumonic, setstringifiedMnenumonic] =
    useState<string>("");
  const generateRandom = () => {
    const words = generateMnemonic(mnemonicWords.length === 12 ? 128 : 256);
    console.log(words);
    setstringifiedMnenumonic(words);

    setMnemonicWords(words.split(" "));
    setMnemonicWordsgen(true);
    setWallets([]);
  };
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      let timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  const addWallet = async () => {
    if (!mnemonicWords.every((word) => word !== "")) {
      alert("Please generate a mnemonic first!");
      return;
    }

    try {
      const response = await fetch("/api/genWallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mnemonicWords, walletIndex: wallets.length }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWallets([...wallets, data.publicKey]);
    } catch (error) {
      console.error("Error adding wallet:", error);
      alert("Failed to add wallet. Please try again.");
    }
  };

  return (
    <div className='flex justify-center items-center flex-col mt-16 md:w-[35rem]  w-[24rem] align-middle '>
      <button
        onClick={generateRandom}
        className='mb-8 px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition'>
        Generate Mnemonic
      </button>
      <div
        onClick={() => {
          navigator.clipboard.writeText(stringifiedMnenumonic);
          setCopied(true);
        }}
        className=' bg-gray-100 rounded-xl  pl-4 pr-4 pt-4 pb-10 gap-1'>
        <div className='grid md:grid-cols-3 grid-cols-2 bg-gray-100 pl-4 pr-4 pt-4  gap-1 '>
          {mnemonicWords.map((word, idx) => (
            <div
              key={idx}
              className='flex gap-2 items-center justify-start bg-white text-black text-xl w-[10rem] h-12 border border-gray-800 rounded-lg shadow-lg'>
              <span className='text-gray-500 text-sm ml-5'>{idx + 1}.</span>
              <span className='flex justify-center items-center text-center text-blue-700 font-semibold'>
                {word}
              </span>
            </div>
          ))}
        </div>
        {mnemonicWordsGen && (
          <div className='w-full mt-6 flex justify-center align-middle text-center hover:cursor-pointer'>
            <div className='flex   text-black rounded  hover:text-blue-700 transition text-center'>
              {copied
                ? "Copied to clipboard"
                : "Click anywhere on the board to copy"}
            </div>
          </div>
        )}
      </div>

      <div className='buttons   flex gap-1 justify-center md:w-[34.5rem] w-[33rem]'>
        {mnemonicWordsGen && (
          <div className='w-full mt-3  flex justify-center md:justify-end'>
            <button
              onClick={addWallet}
              className=' flex  px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition'>
              Add Wallet
            </button>
          </div>
        )}
      </div>

      <div className='grid grid-cols-2 mb-10 flex-col gap-5 mt-10 w-screen pl-24 pr-24'>
        {wallets.map((wallet, index) => (
          <li
            className='list-none gap-2 text-lg  p-5 bg-blue-100 flex rounded-lg'
            key={index}>
            <span className='text-lg flex justify-center items-center align-middle gap-2'>
              Wallet
              <FaWallet />:
            </span>
            {wallet}
          </li>
        ))}
      </div>
    </div>
  );
};

export default NeumonicCard;
