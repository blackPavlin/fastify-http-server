import { GetterTree } from "vuex";
import { AuthState } from "@/store/modules/auth/state";

// TODO: Вынести
import { RootState } from "@/store/types";

export type AuthGetterT = {
  [AuthGetterE.isAuth](state: AuthState): boolean;
};

export enum AuthGetterE {
  isAuth = "IS_AUTH",
  getToken = "GET_TOKEN",
}

const getters: GetterTree<AuthState, RootState> & AuthGetterT = {
  [AuthGetterE.isAuth]: (state) => !!state.token,
};

export default getters;
