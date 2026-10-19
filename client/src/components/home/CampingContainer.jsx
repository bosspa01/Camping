import useCampingStore from "@/store/camping-store";
import MapHome from "../map/MapHome";
import CampingLists from "./CampingLists";
import { useEffect } from "react";
import { useUser } from "@clerk/react";
import CategoryLists from "./CategoryLists";
import { useSearchParams } from "react-router";

const CampingContainer = () => {
  const actionListCamping = useCampingStore((state) => state.actionListCamping);
  const actionFilter = useCampingStore((state) => state.actionFilter);
  const [searchParams, setSearchParams] = useSearchParams();

  const { user } = useUser();
  const id = user?.id ?? null;

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  useEffect(() => {
    if (category || search) {
      actionFilter(category, search);
    }else if(!search && !category){
      actionListCamping(id);
    }
  }, [category, search]);

  return (
    <div>
      <CategoryLists />
      <MapHome />
      <CampingLists />
    </div>
  );
};
export default CampingContainer;
