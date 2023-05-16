import { api } from "@/utils/api";
import { useWalletStore } from "@/app/walletStore";
import { Button } from "@/components/ui/button";
import Modal from './Modal';

const Card = () => {
  const walletId = useWalletStore((state) => state.walletId);
  const { data } = api.wallet.getBalance.useQuery({ walletId });

  return (
    <div className="rounded-lg border px-4 py-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm tracking-tight text-slate-500">
            Available balance
          </h2>
          <span className="text-xs tracking-tight text-slate-500">
            {data?.wallet?.currency ? `(${data.wallet.currency})` : null}
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          {data?.balance && data.balance < 0 ? "-" : ""} ${" "}
          {data?.balance ? Math.abs(data.balance) : 0}
        </h2>
        <div className="flex w-full gap-2">
          <Modal/>
        </div>
      </div>
    </div>
  );
};

export default Card;
