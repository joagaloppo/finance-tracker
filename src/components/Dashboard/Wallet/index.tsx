import { api } from "@/utils/api";
import { useWalletStore } from "@/app/walletStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import Add from "@/components/Dashboard/Wallet/add";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Cardy = () => {
  const walletId = useWalletStore((state) => state.walletId);
  const [showBalance, setShowBalance] = useState(true);
  const { data, isLoading } = api.wallet.getInfo.useQuery({ walletId });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Available balance</CardTitle>
          <span className="w-fit rounded-2xl bg-blue-800 px-[6px] text-[10px] tracking-tight text-white opacity-60">
            {data?.wallet?.currency ? `${data.wallet.currency}` : null}
          </span>
        </div>
        <CardDescription>
          {data?.wallet?.name ? `Your money in ${data.wallet.name.toLowerCase()}.` : `Your money is loading...`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2
          className={cn(
            "flex items-center gap-2 text-2xl font-bold text-slate-800",
            isLoading && "animate-pulse opacity-80"
          )}
        >
          {data?.balance && data.balance < 0 ? "-" : ""}
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
        <Add />
      </CardFooter>
    </Card>
  );
};

export default Cardy;
