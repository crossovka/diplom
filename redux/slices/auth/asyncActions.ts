import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import api from '@/api/apiInstance';
import { onAuthSuccess } from '@/lib/utils/auth';

import { AppDispatch } from '@/redux/store';

import { ISignUp } from './types';

export const signUp = createAsyncThunk(
	'auth/signUp',
	async ({ name, password, email }: ISignUp, { rejectWithValue, dispatch }) => {
		try {
			// TODO Нужно data тоже типизировать
			const { data } = await api.post('/api/users/signup', { name, password, email });

			if (data.warningMessage) {
				toast.error(data.warningMessage);
				return rejectWithValue(data.warningMessage);
			}
			// хуки React (включая useAppDispatch) могут быть вызваны только внутри React-компонентов
			// или пользовательских хуков. Их нельзя использовать на верхнем уровне модуля или вне компонентов.
			// dispatch уже доступен внутри контекста createAsyncThunk. он передаётся автоматически
			onAuthSuccess('Регистрация прошла успешно!', data, dispatch as AppDispatch);
			return data;
		} catch (error) {
			toast.error((error as Error).message);
			return rejectWithValue((error as Error).message);
		}
	}
);

export const signIn = createAsyncThunk(
	'auth/signIn',
	async ({ email, password }: ISignUp, { rejectWithValue, dispatch }) => {
		try {
			const { data } = await api.post('/api/users/login', { email, password });

			if (data.warningMessage) {
				toast.error(data.warningMessage);
				return rejectWithValue(data.warningMessage);
			}

			onAuthSuccess('Регистрация прошла успешно!', data, dispatch as AppDispatch);
			// Токены
			console.log('data', data);
			return data;
		} catch (error) {
			toast.error((error as Error).message);
			return rejectWithValue((error as Error).message);
		}
	}
);

export const refreshToken = createAsyncThunk(
	'auth/refreshToken',
	async ({ jwt }: { jwt: string }, { rejectWithValue }) => {
		try {
			const { data } = await api.post('/api/users/refresh', { jwt });
			localStorage.setItem('auth', JSON.stringify(data));
			return data;
		} catch (error) {
			toast.error((error as Error).message);
			return rejectWithValue((error as Error).message);
		}
	}
);