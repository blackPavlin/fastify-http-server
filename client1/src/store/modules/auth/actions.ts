import { ActionTree, ActionContext } from "vuex";
import { AuthState } from "@/store/modules/auth/state";
import { AuthMutationT, AuthMutationE } from "@/store/modules/auth/mutations";
import client from "@/plugins/axios";

// TODO: Вынести
import { RootState } from "@/store/types";

type ActionAugments = Omit<ActionContext<AuthState, RootState>, "commit"> & {
  commit<K extends keyof AuthMutationT>(
    key: K,
    payload: Parameters<AuthMutationT[K]>[1]
  ): ReturnType<AuthMutationT[K]>;
};

export type AuthActionT = {
  [AuthActionE.login](
    context: ActionAugments,
    payload: { login: string; password: string }
  ): Promise<void>;
};

export enum AuthActionE {
  login = "LOGIN",
}

const actions: ActionTree<AuthState, RootState> & AuthActionT = {
  async [AuthActionE.login]({ commit }, payload): Promise<void> {
    try {
      const response = await client.post<{ token: string }>("/period", payload);
      commit(AuthMutationE.setToken, response.data.token);
    } catch (error) {
      console.error(error);
    }
  },
};

export default actions;
