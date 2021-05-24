import { createStore, createLogger  } from "vuex";
import period from "./modules/period/index";
import { RootState, Store } from "@/store/types";

export const store = createStore<RootState>({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  modules: {
    period,
  },
});

export function useStore(): Store {
  return store as Store;
};
