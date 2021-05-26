import { createStore, createLogger } from "vuex";
import period from "@/store/modules/period/index";
import auth from "@/store/modules/auth/index";

import { RootState, Store } from "@/store/types";

export const store = createStore<RootState>({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  modules: {
    period,
    auth,
  },
});

export function useStore(): Store {
  return store as Store;
}
