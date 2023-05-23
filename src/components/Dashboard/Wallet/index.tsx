import { api } from "@/utils/api";
import { useWalletStore } from "@/app/walletStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import Add from "@/components/Dashboard/Wallet/add";
import { cn } from "@/lib/utils";

const Cardy = () => {
  const walletId = useWalletStore((state) => state.walletId);
  const { data, isLoading } = api.wallet.getBalance.useQuery({ walletId });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Available balance</CardTitle>
          <span className="w-fit rounded-lg bg-slate-400 px-[6px] text-[10px] tracking-tight text-white">
            {data?.wallet?.currency ? `${data.wallet.currency}` : null}
          </span>
        </div>
        <CardDescription>
          {data?.wallet?.name ? `Your money in ${data.wallet.name}.` : `Your money is loading...`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className={cn("text-2xl font-bold tracking-tight text-slate-800", isLoading && "animate-pulse opacity-80")}>
          {data?.balance && data.balance < 0 ? "-" : ""} {isLoading && "$ "}
          {!isLoading && `$ ${Math.abs(data?.balance || 0).toLocaleString("en-US") || 0}`}
        </h2>
      </CardContent>
      <CardFooter>
        <Add />
      </CardFooter>
    </Card>
  );
};

export default Cardy;
