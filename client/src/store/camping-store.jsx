import {
  addOrRemoveFavorite,
  filterCamping,
  listCamping,
  listFavorites,
} from "@/api/camping";
import { ca } from "date-fns/locale";
import { success } from "zod";
import { create } from "zustand";

const campingStore = (set, get) => ({
  campings: [],
  favorites: [],
  center: null,
  actionListCamping: async (id) => {
    try {
      const res = await listCamping(id);
      // console.log("This is Zustand",res.data.result);
      set({
        campings: res.data.result,
        center: res.data.center,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionAddorRemoveFavorite: async (token, data) => {
    try {
      const res = await addOrRemoveFavorite(token, data);
      const camping = get().campings;
      const { campingId, isFavorite } = data;
      // console.log(camping);
      const updatedCamping = camping.map((item) => {
        return item.id === campingId
          ? { ...item, isFavorite: !isFavorite }
          : item;
      });
      // console.log(updatedCamping);
      set({
        campings: updatedCamping,
      });

      // Update favorites
      const favorites = get().favorites;
      const updatedFavorites = favorites.filter((item) => {
        return item.landmark.id !== campingId;
      });

      set({
        favorites: updatedFavorites,
      });

      // console.log(res.data.message);
      return { success: true, message: res.data.message };
    } catch (error) {
      console.log(error?.response?.data?.message);
      const err = error?.response?.data?.message;
      return { success: false, message: err };
    }
  },
  actionListFavorites: async (token) => {
    try {
      const res = await listFavorites(token);
      // console.log(res.data.result);
      set({
        favorites: res.data.result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionFilter: async (category = "", search = "") => {
    try {
      const res = await filterCamping(category, search);
      // console.log("Hi Filter From Zustand", res.data.result);
      set({ campings: res.data.result, center: res.data.center });
    } catch (error) {
      console.log(error);
    }
  },
});

const useCampingStore = create(campingStore);

export default useCampingStore;
