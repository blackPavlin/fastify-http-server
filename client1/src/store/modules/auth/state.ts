export type AuthState = {
  token: string;
};

const state: AuthState = {
  token: localStorage.getItem("token") || "",
};

export default state;
