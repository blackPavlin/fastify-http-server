import { GetterTree } from "vuex";
import { PeriodState, Period } from "@/store/modules/period/state";

// TODO: Вынести
import { RootState } from "@/store/types";

export type PeriodGetterT = {
  [PeriodGetterE.getPeriods](state: PeriodState): Period[];
};

export enum PeriodGetterE {
    getPeriods = "GET_PERIODS",
}

const getters: GetterTree<PeriodState, RootState> & PeriodGetterT = {
  [PeriodGetterE.getPeriods]: (state): Period[] => state.periods,
};

export default getters;
