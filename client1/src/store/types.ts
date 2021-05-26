import { PeriodState } from "./modules/period/state";
import { PeriodStore } from "./modules/period";
import { AuthStore } from "./modules/auth";
import { AuthState } from "./modules/auth/state";

export type RootState = {
  period: PeriodState;
  auth: AuthState;
};

export type Store = PeriodStore<Pick<RootState, "period">> &
  AuthStore<Pick<RootState, "auth">>;
