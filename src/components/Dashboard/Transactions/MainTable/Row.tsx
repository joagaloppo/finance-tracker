import { ArrowLeft, ArrowRight } from "lucide-react";

const Row = (props: {
  id: number;
  description: string | null;
  amount: number;
  date: Date;
  onDelete: (id: string) => void;
}) => {
  return (
    <tr className="w-full max-w-screen-sm cursor-pointer bg-white hover:bg-gray-50">
      <td className="overflow-hidden whitespace-nowrap px-4 py-4 text-sm text-gray-800">
        <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-gray-300">
          {props.amount >= 0 ? (
            <ArrowRight className="h-4 w-4 text-slate-400" />
          ) : (
            <ArrowLeft className="h-4 w-4 text-slate-400" />
          )}
        </span>
      </td>
      <td className="w-full overflow-hidden whitespace-nowrap px-4 py-4 text-sm text-gray-800">
        <div className="flex flex-col gap-1 text-left">
          <span className="text-sm font-medium">
            {props.amount >= 0 ? "Received money" : "Paid money"}
          </span>
          <span className="max-w-[30%] text-ellipsis text-xs font-thin text-gray-500">
            {props.description || "No description"}
          </span>
        </div>
      </td>
      <td className="overflow-hidden whitespace-nowrap px-4 py-4 text-sm text-gray-800">
        <div className="flex flex-col gap-1 text-right">
          <span className="font-medium tracking-tighter text-slate-600">
            {props.amount >= 0 ? "+" : "-"} $ {Math.abs(props.amount)}
          </span>
          <span className="text-xs font-extralight tracking-tight text-gray-400">
            {props.date.toISOString().split("T")[0]}
            {" - "}
            {props.date.toTimeString().split(" ")[0]}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default Row;
