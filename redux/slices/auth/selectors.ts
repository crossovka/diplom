import { RootState } from '@/redux/store';

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthModalOpen = (state: RootState) => state.auth.isAuthModalOpen;