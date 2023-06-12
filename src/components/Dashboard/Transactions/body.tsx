import { api } from "@/utils/api";
import { useEffect } from "react";
import { useWalletStore } from "@/app/walletStore";
import { useTransactionStore } from "@/app/transactionStore";
import { usePageStore } from "@/app/pageStore";
import Edit from "./edit";
import Spinner from "@/components/ui/spinner";
import { useSearchStore } from "@/app/searchStore";

const Body = () => {
  const walletId = useWalletStore((state) => state.walletId);

  const transactions = useTransactionStore((state) => state.transactions);
  const setTransactions = useTransactionStore((state) => state.setTransactions);

  const search = useSearchStore((state) => state.search);
  const page = usePageStore((state) => state.page);

  const { data, isLoading } = api.transaction.getTen.useQuery({ walletId, skip: page * 10 - 10, search });

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
                <Spinner theme="dark" />
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
