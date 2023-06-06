import Top from "./Top";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
import { useWalletStore } from "@/app/walletStore";

export default function Dashboard() {
  const wallets = useWalletStore((state) => state.wallets);

  return (
    <main className="w-full">
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
