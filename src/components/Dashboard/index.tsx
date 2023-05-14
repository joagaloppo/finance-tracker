import Wallet from "./Wallet";
import Transactions from "./Transactions";

export default function DashboardComponent() {
  return (
    <main className="min-h-[calc(100svh_-_140px)] w-full">
      <div className="mx-auto flex w-full max-w-screen-md flex-col gap-4 px-3 py-4">
        <Wallet />
        <Transactions />
      </div>
    </main>
  );
}
