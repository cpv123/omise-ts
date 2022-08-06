import { useState } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>("");

  const handleCreateCharge = async () => {
    setLoading(true);
    await fetch("/api/charges", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setAmount("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-xl font-bold mb-6">Create a charge with Omise</h1>
      <div className="flex flex-col sm:flex-row">
        <input
          className="mb-6 sm:mb-0 mr-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Amount (THB)"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button
          disabled={loading || !amount}
          onClick={handleCreateCharge}
          type="button"
          className="w-60 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create Charge
        </button>
      </div>
    </div>
  );
};

export default Home;
