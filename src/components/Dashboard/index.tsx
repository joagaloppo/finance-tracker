import Top from "./Top";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
import { useWalletStore } from "@/app/walletStore";

export default function Dashboard() {
  const wallets = useWalletStore((state) => state.wallets);

  return (
    <main className="min-h-[calc(100svh_-_61px)] w-full bg-gray-50">
      <div className="mx-auto flex w-full max-w-screen-md flex-col gap-4 p-4">
        <Top />
        {wallets && wallets.length > 0 && (
          <>
            <Wallet />
            <Transactions />
          </>
        )}
      </div>
    </main>
  );
}
