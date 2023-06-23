import { api } from "@/utils/api";
import { useEffect } from "react";
import { useWalletStore } from "@/app/walletStore";
import { SelectorWallet } from "./SelectorWallet";
import { DialogUpsertWallet } from "./DialogUpsertWallet";
import Spinner from "@/components/ui/spinner";

const Top = () => {
  const { data, isLoading } = api.wallet.getAll.useQuery();
  const { wallets, walletId, setWallets, setWalletId } = useWalletStore();

  useEffect(() => {
    if (data) {
      setWallets(data);
      data[0] && setWalletId(data[0].id);
    }
  }, [data, setWallets, setWalletId]);

  if (!isLoading && wallets && !wallets.length)
    return (
      <div className="flex gap-2">
        <DialogUpsertWallet />
      </div>
    );

  if (isLoading) return <Spinner theme="dark" />;

  return (
    <div className="flex gap-2">
      <SelectorWallet />
      <DialogUpsertWallet />
      <DialogUpsertWallet wallet={wallets.find((wallet) => wallet.id === walletId)} />
    </div>
  );
};

export default Top;
