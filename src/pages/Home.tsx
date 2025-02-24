import React, { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import studentIDImage from './istockphoto-612650934-612x612.jpg';
import contractConfig from "../../contractConfig.json"

const contractAddress = contractConfig.address as `0x${string}`;
const abi = contractConfig.abi;

export default function Home() {
  const { address, isConnected } = useAccount();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    specialty: "",
  });

  const { writeContract, isPending, isSuccess, isError } = useWriteContract({
    mutation: {
      onSuccess: (tx) => {
        console.log("Transaction sent:", tx);
        setTxHash(tx);
      },
      onError: (error) => {
        console.error("Minting failed:", error);
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mint = () => {
    writeContract({
      address: contractAddress,
      abi,
      functionName: "mint",
      // Corrected arguments order and removed address parameter
      args: [formData.name, formData.specialty, formData.gender],
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Mint Your HackerHouse ID
      </h1>

      {isConnected ? (
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <input
                type="text"
                name="specialty"
                placeholder="Front-End/Back-End/Solidity"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                placeholder="Male/Female/Other"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
              />
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={mint}
              disabled={isPending}
            >
              {isPending ? "Minting..." : "Mint HackerHouse ID"}
            </button>
          </div>

          {isSuccess && (
            <div className="mt-6 p-4 bg-green-900/30 rounded-lg border border-green-500">
              <p className="text-green-400 text-center">🎉 Successfully minted!</p>
            </div>
          )}

          {isError && (
            <div className="mt-6 p-4 bg-red-900/30 rounded-lg border border-red-500">
              <p className="text-red-400 text-center">
                ⚠️ Transaction failed. Please try again.
              </p>
            </div>
          )}
          {txHash && (
            <div className="mt-6 text-center">
              <a
                href={`https://pacific-explorer.sepolia-testnet.manta.network/token/${txHash}/instance`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm underline underline-offset-4"
              >
                View transaction on explorer
              </a>
            </div>
          )}
        </div>
      ) : (
        <>
          <img
            src={studentIDImage}
            alt="Student ID Preview"
            className="mx-auto mb-4 w-60 h-40 rounded-lg"
          />
        </>
      )}
    </div>
  );
}