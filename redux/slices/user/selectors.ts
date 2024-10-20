import { RootState } from "../../store";

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoginCheckLoading = (state: RootState) => state.user.loading;
export const selectUserGeolocation = (state: RootState) => state.user.userGeolocation;