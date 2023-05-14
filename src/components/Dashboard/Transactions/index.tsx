import { api } from "@/utils/api";
import MainTable from "./MainTable";
import { useWalletStore } from "@/app/walletStore";

const Transactions = () => {
  const walletId = useWalletStore((state) => state.walletId);
  const { data } = api.transaction.getTen.useQuery({ walletId });

  return <MainTable data={data} />;
};

export default Transactions;
