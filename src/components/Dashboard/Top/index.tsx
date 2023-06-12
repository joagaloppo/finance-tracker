import { api } from "@/utils/api";
import { useEffect } from "react";
import { useWalletStore } from "@/app/walletStore";

import Select from "./select";
import Add from "./add";
import Edit from "./edit";

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
    <div className="flex items-center gap-2">
      <Select />
      <div className="flex gap-2">
        <Add />
        <Edit />
      </div>
    </div>
  );
};

export default Top;
