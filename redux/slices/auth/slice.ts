import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signUp, signIn, refreshToken } from './asyncActions';
import { AuthState } from './types';

const initialState: AuthState = {
	isAuth: false,
	isAuthModalOpen: false,
	error: null,
	isLoading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		openAuthModal(state) {
			state.isAuthModalOpen = true;
		},
		closeAuthModal(state) {
			state.isAuthModalOpen = false;
		},
		setIsAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Регестрация
			.addCase(signUp.pending, (state) => {
				state.error = null;
				state.isLoading = true;  // Начало загрузки
			})
			.addCase(signUp.fulfilled, (state) => {
				state.isAuth = true;
				state.isLoading = false;  // Окончание загрузки
			})
			.addCase(signUp.rejected, (state, action) => {
				state.error = action.payload as string;
				state.isLoading = false;  // Окончание загрузки при ошибке
			})
			// Авторизация
			.addCase(signIn.pending, (state) => {
				state.error = null;
				state.isLoading = true;  // Начало загрузки
			})
			.addCase(signIn.fulfilled, (state) => {
				state.isAuth = true;
				state.isLoading = false;  // Окончание загрузки
			})
			.addCase(signIn.rejected, (state, action) => {
				state.error = action.payload as string;
				state.isLoading = false;  // Окончание загрузки при ошибке
			})
			// Обновление токена
			.addCase(refreshToken.pending, (state) => {
				state.error = null;
				state.isLoading = true;  // Начало загрузки
			})
			.addCase(refreshToken.fulfilled, (state) => {
				state.isLoading = false;  // Окончание загрузки
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.error = action.payload as string;
				state.isLoading = false;  // Окончание загрузки при ошибке
			})
	}
});

export const { openAuthModal, closeAuthModal, setIsAuth } = authSlice.actions;
export default authSlice.reducer;