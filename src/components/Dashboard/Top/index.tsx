import { api } from "@/utils/api";
import { useEffect } from "react";
import { useWalletStore } from "@/app/walletStore";

import { SelectorWallet } from "./SelectorWallet";
import { DialogUpsertWallet } from "./DialogUpsertWallet";

const Top = () => {
  const { data, isLoading } = api.wallet.getAll.useQuery();
  const { wallets, walletId, setWallets, setWalletId } = useWalletStore();

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
      <SelectorWallet />
      <div className="flex gap-2">
        <DialogUpsertWallet />
        <DialogUpsertWallet wallet={wallets.find((wallet) => wallet.id === walletId)} />
      </div>
    </div>
  );
};

export default Top;
