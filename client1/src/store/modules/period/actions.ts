import { ActionTree, ActionContext } from "vuex";
import { PeriodState, Period } from "@/store/modules/period/state";
import {
  PeriodMutationT,
  PeriodMutationE,
} from "@/store/modules/period/mutations";
import client from "@/plugins/axios";

// TODO: Вынести
import { RootState } from "@/store/types";

type ActionAugments = Omit<ActionContext<PeriodState, RootState>, "commit"> & {
  commit<K extends keyof PeriodMutationT>(
    key: K,
    payload: Parameters<PeriodMutationT[K]>[1]
  ): ReturnType<PeriodMutationT[K]>;
};

export type PeriodActionT = {
  [PeriodActionE.getPeriods](context: ActionAugments): Promise<void>;
};

export enum PeriodActionE {
  getPeriods = "GET_PERIODS",
}

const actions: ActionTree<PeriodState, RootState> & PeriodActionT = {
  async [PeriodActionE.getPeriods]({ commit }): Promise<void> {
    try {
      const response = await client.get<{ periods: Period[] }>("/period");
      commit(PeriodMutationE.setPeriods, response.data.periods);
    } catch (error) {
      console.error(error);
    }
  },
};

export default actions;
