import { MutationTree } from "vuex";
import { AuthState } from "@/store/modules/auth/state";

export type AuthMutationT<S = AuthState> = {
  [AuthMutationE.setToken](state: S, token: string): void;
  [AuthMutationE.clearToken](state: S): void;
};

export enum AuthMutationE {
  setToken = "SET_TOKEN",
  clearToken = "CLEAR_TOKEN",
}

const mutations: MutationTree<AuthState> & AuthMutationT = {
  [AuthMutationE.setToken](state, token): void {
    state.token = token;
    localStorage.setItem("token", token);
  },
  [AuthMutationE.clearToken](state): void {
    state.token = "";
    localStorage.removeItem("token");
  },
};

export default mutations;
