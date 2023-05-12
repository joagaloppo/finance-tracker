import { Button } from "@/components/ui/button";
import { Plus, SearchIcon } from "lucide-react";

const Header = (props: { setSearch: (value: string) => void }) => {
  return (
    <div className="px-4 py-3">
      <div className="relative flex w-full items-center">
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

export default Header;