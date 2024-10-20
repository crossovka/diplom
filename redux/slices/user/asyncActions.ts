import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import api from '@/api/apiInstance';
import { handleJWTError } from '../handleJWTError';

import { setIsAuth } from '../auth/slice';

import { IGetGeolocation, ILoginCheck, IUser } from './types';

export const loginCheck = createAsyncThunk(
	'user/loginCheck',
	async ({ jwt }: ILoginCheck, { rejectWithValue, dispatch }) => {
		try {
			const { data } = await api.get('/api/users/login-check', {
				headers: { Authorization: `Bearer ${jwt}` },
			});

			if (data?.error) {
				console.log(data);
				// handleJWTError(data.error.name, 'loginCheck')
				// здесь нет необходимости явно указывать dispatch as AppDispatch, так как это уже должно быть правильно типизировано в вашем Redux store.
				await handleJWTError(data.error.name, dispatch, { repeatRequestMethodName: 'loginCheck' });
				return rejectWithValue(data.error.message);
			}

			setIsAuth(true);
			return data.user as IUser;
		} catch (error) {
			toast.error((error as Error).message);
			return rejectWithValue((error as Error).message);
		}
	}
);

export const getGeolocation = createAsyncThunk(
	'user/getGeolocation',
	async ({ lon, lat }: IGetGeolocation, { rejectWithValue }) => {
		try {
			const { data } = await api.get(
				`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
			);

			return data;
		} catch (error) {
			toast.error((error as Error).message);
			return rejectWithValue((error as Error).message);
		}
	}
);