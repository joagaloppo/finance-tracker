import { api } from "@/utils/api";
import { useWalletStore } from "@/app/walletStore";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { usePageStore } from "@/app/pageStore";
import { useSearchStore } from "@/app/searchStore";
import Edit from "../Transactions/DialogUpsertTransaction";

const Cardy = () => {
  const [showBalance, setShowBalance] = useState(true);

  const search = useSearchStore((state) => state.search);
  const walletId = useWalletStore((state) => state.walletId);
  const setTransactionCount = usePageStore((state) => state.setCount);

  const { data, isLoading } = api.wallet.getInfo.useQuery({ walletId, search });

  useEffect(() => {
    if (data?.count) {
      setTransactionCount(data.count);
    }
  }, [data?.count, setTransactionCount]);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Available balance</CardTitle>
          <span className="w-fit rounded-2xl bg-blue-800/60 px-[6px] text-[10px] tracking-tight text-white">
            {data?.wallet?.currency ? `${data.wallet.currency}` : null}
          </span>
        </div>
        <CardDescription>
          {data?.wallet?.description ? data.wallet.description : `Your wallet is loading...`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2
          className={cn(
            "flex items-center gap-2 text-2xl font-bold text-gray-800",
            isLoading && "animate-pulse opacity-80"
          )}
        >
          {showBalance && data?.balance && data.balance < 0 ? "-" : ""}
          {isLoading && "$---"}
          {!isLoading && (showBalance ? `$${Math.abs(data?.balance || 0).toLocaleString("en-US")} ` : `$---`)}

          {!isLoading &&
            (showBalance ? (
              <Eye className="inline-block cursor-pointer" onClick={() => setShowBalance(!showBalance)} size={18} />
            ) : (
              <EyeOff className="inline-block cursor-pointer" onClick={() => setShowBalance(!showBalance)} size={18} />
            ))}
        </h2>
      </CardContent>
      <CardFooter>
        <Edit />
      </CardFooter>
    </div>
  );
};

export default Cardy;
