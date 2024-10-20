import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginCheck, getGeolocation } from './asyncActions';
import { IUser, IUserGeolocation, UserState } from './types';

const initialState: UserState = {
	user: {} as IUser,
	userGeolocation: {} as IUserGeolocation,
	loading: false, // Начальное состояние загрузки loginCheck
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload;
		},
		// user: IUser | null; указать и тут null как вариант
		clearUser(state) {
			state.user = {} as IUser;
		},
		setUserGeolocation(state, action: PayloadAction<IUserGeolocation>) {
			state.userGeolocation = action.payload;
		},
		// updateUsername(state, action: PayloadAction<string>) {
		// 	state.user.name = action.payload;
		// },
		// updateUserImage(state, action: PayloadAction<string>) {
		// 	state.user.image = action.payload;
		// },
		// updateUserEmail(state, action: PayloadAction<string>) {
		// 	state.user.email = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder
			// Состояние при ожидании выполнения loginCheck
			.addCase(loginCheck.pending, (state) => {
				state.loading = true; // Включаем загрузку
				state.error = null;   // Очищаем ошибку
			})
			// Состояние при успешном выполнении loginCheck
			.addCase(loginCheck.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.loading = false; // Отключаем загрузку
				console.log('action.payload', action)
				state.user = action.payload; // Обновляем пользователя
			})
			// Состояние при ошибке loginCheck
			.addCase(loginCheck.rejected, (state, action) => {
				state.loading = false; // Отключаем загрузку
				state.error = action.payload as string; // Устанавливаем ошибку
			})
		// TODO под этот экшн свой isLoading
		// .addCase(getGeolocation.pending, (state) => {
		// 	state.loading = true;
		// 	state.error = null;
		// })
		// .addCase(getGeolocation.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.userGeolocation = action.payload;
		// })
		// .addCase(getGeolocation.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.error = action.payload as string;
		// });
	}
});

export const { updateUser, setUserGeolocation, updateUsername, updateUserImage, updateUserEmail } = userSlice.actions;

export default userSlice.reducer;