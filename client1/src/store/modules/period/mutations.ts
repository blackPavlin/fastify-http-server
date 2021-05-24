import { MutationTree } from "vuex";
import { PeriodState, Period } from "@/store/modules/period/state";

export type PeriodMutationT<S = PeriodState> = {
    [PeriodMutationE.setPeriods](state: S, periods: Period[]): void;
};

export enum PeriodMutationE {
    setPeriods = "SET_PERIODS",
};

const mutations: MutationTree<PeriodState> & PeriodMutationT = {
    [PeriodMutationE.setPeriods](state, periods): void {
        state.periods = periods;
    },
};

export default mutations;
