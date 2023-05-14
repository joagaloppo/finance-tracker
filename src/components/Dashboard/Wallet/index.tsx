import { api } from "@/utils/api";
import SelectWallet from "@/components/Dashboard/Wallet/SelectWallet";
import Card from "./Card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Transactions = () => {
  const { data, isLoading } = api.wallet.getAll.useQuery();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        {!isLoading && data ? <SelectWallet wallets={data} /> : <div />}
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-3.5 w-3.5" />
          Add wallet
        </Button>
      </div>
      <Card />
    </div>
  );
};

export default Transactions;
