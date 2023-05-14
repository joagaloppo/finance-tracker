import { Search } from "lucide-react";

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
            className="block w-full p-2 pl-8 text-sm focus:outline-none"
            placeholder="Search for a transaction..."
            onChange={(e) => props.setSearch(e.target.value)}
          />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
          <Search className="h-3.5 w-3.5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Header;
