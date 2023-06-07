import { useSearchStore } from "@/app/searchStore";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");
  const setSearch = useSearchStore((state) => state.setSearch);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");
    setSearch(value);
  };

  return (
    <form className="relative flex w-full items-center" onSubmit={(e) => handleSearch(e)}>
      <div className="relative w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          name="search"
          className="block w-full p-2 pl-8 text-sm focus:outline-none"
          placeholder="Search for a transaction..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
        <SearchIcon className="h-3.5 w-3.5 text-gray-400" />
      </div>
      {/* <button type="submit">Submit</button> */}
    </form>
  );
};

export default Search;
