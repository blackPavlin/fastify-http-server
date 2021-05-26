import { Module, Store, CommitOptions, DispatchOptions } from "vuex";

import state, { AuthState } from "@/store/modules/auth/state";
import actions, { AuthActionT } from "@/store/modules/auth/actions";
import mutations, { AuthMutationT } from "@/store/modules/auth/mutations";
import getters, { AuthGetterT } from "@/store/modules/auth/getters";

// TODO: Вынести
import { RootState } from "@/store/types";

export type AuthStore<S = AuthState> = Omit<
  Store<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof AuthMutationT,
    P extends Parameters<AuthMutationT[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<AuthMutationT[K]>;
} & {
  dispatch<K extends keyof AuthActionT>(
    key: K,
    payload?: Parameters<AuthActionT[K]>[1],
    options?: DispatchOptions
  ): ReturnType<AuthActionT[K]>;
} & {
  getters: {
    [K in keyof AuthGetterT]: ReturnType<AuthGetterT[K]>;
  };
};

const block: Module<AuthState, RootState> = {
  state,
  actions,
  mutations,
  getters,
};

export default block;
