import { CiSearch } from "react-icons/ci";
function NavSearch() {
  return (
    <div className="relative">
      <form className="flex gap-2 bg-gray-100 px-2 font-normal">
        <input
          className="px-5 py-3 outline-none w-full bg-transparent "
          placeholder="Iphone 15 pro"
        />
        <button className="text-2xl">
          <CiSearch />
        </button>
      </form>
    </div>
  );
}

export default NavSearch;
