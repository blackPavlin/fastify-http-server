import { PeriodState } from "./modules/period/state";
import { PeriodStore } from "./modules/period";

export type RootState = {
    period: PeriodState,
};

export type Store = PeriodStore<Pick<RootState, "period">>;
