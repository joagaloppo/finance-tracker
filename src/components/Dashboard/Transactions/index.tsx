import { api } from "@/utils/api";
import MainTable from "./MainTable";
import { useWalletStore } from "@/app/walletStore";

const Transactions = () => {
  const walletId = useWalletStore((state) => state.walletId);
  const { data } = api.transaction.getTen.useQuery({ walletId });

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="inline-flex items-center text-2xl font-bold tracking-tight text-slate-800">
            Your transactions
          </h2>
          <p className="text-sm text-slate-600">
            View and manage your transactions
          </p>
        </div>
      </div>
      <MainTable data={data} />
    </div>
  );
};

export default Transactions;
