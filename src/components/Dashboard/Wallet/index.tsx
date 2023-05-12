import { api } from "@/utils/api";
import SelectWallet from "@/components/Dashboard/Wallet/SelectWallet";

const Transactions = () => {
  const { data, isLoading } = api.wallet.getAll.useQuery();

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="inline-flex items-center text-2xl font-bold tracking-tight text-slate-800">
            Wallet
          </h2>
          <p className="text-sm text-slate-600">
            Select a wallet to view its transactions
          </p>
        </div>
        <SelectWallet wallets={data}/>
      </div>
    </div>
  );
};

export default Transactions;
