"use client";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import fetchSearches from "@/libs/fetchSearches";
import { CiSearch } from "react-icons/ci";
function NavSearch() {
  const [search, setSearch] = useState(null);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const initial = useRef(true);
  async function handleSearch(value) {
    if(initial.current){
      initial.current = false;
      return;
    }
    const data = await fetchSearches(value)
    console.log(data);
    return data;
  }
  useEffect(() => {
    const searchedData = handleSearch(debouncedValue);
    setSearch(searchedData);
  }, [debouncedValue]);
  return (
    <div className="relative">
      <form className="flex gap-2 bg-gray-100 px-2 font-normal">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-5 py-3 outline-none w-full bg-transparent "
          placeholder="Iphone 15 pro"
        />
        <button className="text-2xl">
          <CiSearch />
        </button>
      </form>
      {/* {
      search && <div className="absolute max-h-60">
        {search.length >0 ? search.map(item=>(
            <p key = {item._id}>{item.title}</p>
        )) : <p>No results found </p>}
      </div>
      } */}
    </div>
  );
}

export default NavSearch;
