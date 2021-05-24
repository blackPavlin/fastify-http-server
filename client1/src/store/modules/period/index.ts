import { Module, Store, CommitOptions, DispatchOptions } from "vuex";

import state, { PeriodState } from "@/store/modules/period/state";
import actions, { PeriodActionT } from "@/store/modules/period/actions";
import mutations, { PeriodMutationT } from "@/store/modules/period/mutations";
import getters, { PeriodGetterT } from "@/store/modules/period/getters";

// TODO: Вынести
import { RootState } from "@/store/types";

export type PeriodStore<S = PeriodState> = Omit<
  Store<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof PeriodMutationT,
    P extends Parameters<PeriodMutationT[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<PeriodMutationT[K]>;
} & {
  dispatch<K extends keyof PeriodActionT>(
    key: K,
    payload?: Parameters<PeriodActionT[K]>[1],
    options?: DispatchOptions
  ): ReturnType<PeriodActionT[K]>;
} & {
  getters: {
    [K in keyof PeriodGetterT]: ReturnType<PeriodGetterT[K]>;
  };
};

const block: Module<PeriodState, RootState> = {
  state,
  actions,
  mutations,
  getters,
};

export default block;
