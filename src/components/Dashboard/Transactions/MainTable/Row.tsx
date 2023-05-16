import { ArrowLeft, ArrowRight } from "lucide-react";

const Row = (props: {
  id: number;
  description: string | null;
  amount: number;
  date: Date;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="flex w-full cursor-pointer gap-3 bg-white px-3 py-5 hover:bg-gray-50">
      <div className="whitespace-nowrap text-sm text-gray-800">
        <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-gray-300">
          {props.amount >= 0 ? (
            <ArrowRight className="h-4 w-4 text-slate-400" />
          ) : (
            <ArrowLeft className="h-4 w-4 text-slate-400" />
          )}
        </span>
      </div>
      <div className="flex w-full flex-col justify-center overflow-hidden whitespace-nowrap text-sm text-gray-800">
        <div className="flex flex-col gap-1 text-left">
          <span className="text-md">
            {props.amount >= 0 ? "Received money" : "Paid money"}
          </span>
          <span className="max-w-[30%] text-ellipsis text-xs font-light text-gray-400">
            {props.description || "No description"}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center whitespace-nowrap text-sm">
        <div className="flex flex-col gap-1 text-right">
          <span className="tracking-tighter text-slate-600">
            {props.amount >= 0 ? "+" : "-"} $ {Math.abs(props.amount)}
          </span>
          <span className="text-xs font-light tracking-tight text-gray-400">
            {props.date.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Row;
