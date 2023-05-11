import { useState } from "react";
import { ArrowLeft, ArrowRight, Plus, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";

const Header = (props: { setSearch: (value: string) => void }) => {
  return (
    <div className="px-4 py-3">
      <div className="relative w-full flex items-center">
        <div className="relative w-full">
          <label htmlFor="hs-table-with-pagination-search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            autoCorrect="off"
            autoCapitalize="off"
            name="hs-table-with-pagination-search"
            id="hs-table-with-pagination-search"
            className="block w-full rounded-md border-gray-200 p-3 pl-10 text-sm focus:outline-none"
            placeholder="Search for a transaction"
            onChange={(e) => props.setSearch(e.target.value)}
          />
        </div>
        <Button size="sm" variant="outline" className="ml-2">
          <SearchIcon className="mr-2 h-3 w-3" /> Search
        </Button>
        <Button size="sm" variant="outline" className="ml-2">
          <Plus className="mr-2 h-3 w-3" /> Add
        </Button>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            className="h-3.5 w-3.5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Row = (props: {
  id: string;
  type: string;
  description: string;
  onDelete: (id: string) => void;
}) => {
  return (
    <tr className="w-full max-w-screen-sm cursor-pointer bg-white hover:bg-gray-50">
      <td className="overflow-hidden whitespace-nowrap px-4 py-4 text-sm text-gray-800">
        <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-gray-300">
          {props.type === "INCOME" ? (
            <ArrowRight className="h-4 w-4 text-slate-400" />
          ) : (
            <ArrowLeft className="h-4 w-4 text-slate-400" />
          )}
        </span>
      </td>
      <td className="w-full overflow-hidden whitespace-nowrap px-4 py-4 text-sm text-gray-800">
        <div className="flex flex-col gap-1 text-left">
          <span className="text-sm font-medium">
            {props.type === "INCOME" ? "Received money" : "Paid money"}
          </span>
          <span className="max-w-[30%] text-ellipsis text-xs font-thin text-gray-500">
            This is a description for the expense and it cant too long.
          </span>
        </div>
      </td>
      <td className="overflow-hidden whitespace-nowrap px-4 py-4 text-sm text-gray-800">
        <div className="flex flex-col gap-1 text-right">
          <span className="font-medium tracking-tighter text-slate-600">
            {props.type === "INCOME" ? "+" : "-"} $ 1,000.00
          </span>
          <span className="text-xs font-extralight tracking-tight text-gray-400">
            20 may 2023
          </span>
        </div>
      </td>
    </tr>
  );
};

const Body = () => {
  const array = new Array(10).fill(0);
  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <tbody className="w-full max-w-screen-sm divide-y divide-gray-200 dark:divide-gray-700">
          {array.map((_, i) => (
            <Row
              key={i
                .toString()
                .split("")
                .map((x) => x.charCodeAt(0))
                .join("")}
              id={i.toString()}
              type={i % 2 === 0 ? "EXPENSE" : "INCOME"}
              description={i.toString()}
              onDelete={() => {
                console.log("asd");
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="px-4 py-">
      <nav className="flex justify-center items-center space-x-2">
        <a
          className="inline-flex items-center gap-2 rounded-md p-4 font-medium text-gray-400 hover:text-blue-600"
          href="#"
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="inline-flex h-10 w-10 items-center rounded-full bg-blue-500 p-4 text-sm font-medium text-white"
          href="#"
          aria-current="page"
        >
          1
        </a>
        <a
          className="inline-flex h-10 w-10 items-center rounded-full p-4 text-sm font-medium text-gray-400 hover:text-blue-600"
          href="#"
        >
          2
        </a>
        <a
          className="inline-flex h-10 w-10 items-center rounded-full p-4 text-sm font-medium text-gray-400 hover:text-blue-600"
          href="#"
        >
          3
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-md p-4 font-medium text-gray-400 hover:text-blue-600"
          href="#"
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </a>
      </nav>
    </div>
  );
};

export default function Table() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div className="inline-block min-w-full overflow-x-auto align-middle">
        <div className="divide-y rounded-lg border">
          <Header setSearch={setSearch} />
          <Body />
          <Footer />
      </div>
    </div>
  );
}
