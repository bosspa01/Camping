import { useSearchParams } from "react-router";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";

const Searchbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearch = useDebouncedCallback((value) => {
    // console.log(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  }, 500);

  const handleSearch = (e) => {
    // console.log(e.target.value);
    updateSearch(e.target.value);
  };

  return (
    <Input
      onChange={handleSearch}
      type="text"
      placeholder="Search ..."
      className="max-w-xs"
    />
  );
};
export default Searchbar;
