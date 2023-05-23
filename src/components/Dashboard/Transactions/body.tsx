import { useWalletStore } from "@/app/walletStore";
import { api } from "@/utils/api";
import { useEffect } from "react";
import Edit from "./edit";

const Body = () => {
  const walletId = useWalletStore((state) => state.walletId);
  const { data, isLoading } = api.transaction.getTen.useQuery({ walletId });
  const setTransactions = useWalletStore((state) => state.setTransactions);
  const transactions = useWalletStore((state) => state.transactions);

  useEffect(() => {
    setTransactions(data || []);
  }, [data, setTransactions]);

  return (
    <div className="overflow-hidden">
      <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          {isLoading && (
            <div className="w-full bg-white">
              <div className="overflow-hidden whitespace-nowrap px-4 py-14 text-center text-sm text-gray-800">
                <span className="text-center">Loading...</span>
              </div>
            </div>
          )}
          {!isLoading && !data?.length && (
            <div className="w-full bg-white">
              <div className="overflow-hidden whitespace-nowrap px-4 py-14 text-center text-sm text-gray-800">
                <span className="block text-center">No transactions found.</span>
              </div>
            </div>
          )}
          {transactions && transactions.map((transaction) => <Edit key={transaction.id} transaction={transaction} />)}
        </div>
      </div>
    </div>
  );
};

export default Body;
