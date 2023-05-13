import Wallet from "./Wallet";
import Transactions from "./Transactions";

export default function DashboardComponent() {
  return (
    <main className="flex min-h-[calc(100svh_-_140px)] flex-col">
      <div className="mx-auto flex w-full max-w-screen-md flex-col gap-8 px-4 py-8">
        <Wallet />
        <Transactions />
      </div>
    </main>
  );
}
