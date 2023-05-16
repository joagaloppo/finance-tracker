import { api } from "@/utils/api";
import Select from "./select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useWalletStore } from "@/app/walletStore";

const Top = () => {
  const { data, isLoading } = api.wallet.getAll.useQuery();
  const setWallets = useWalletStore((state) => state.setWallets);
  const setWalletId = useWalletStore((state) => state.setWalletId);

  useEffect(() => {
    if (data) {
      setWallets(data);
      data[0] && setWalletId(data[0].id);
    }
  }, [data, setWallets, setWalletId]);

  if (isLoading) return <div />;
  
  // You have no wallets:
  // if (!isLoading && !data) return <div />;
  
  return (
    <div className="flex items-center justify-between gap-2">
      <Select />
      <Button variant="outline" size="sm">
        <Plus className="mr-2 h-3.5 w-3.5 text-slate-500" />
        Add wallet 
      </Button>
    </div>
  );
};

export default Top;
