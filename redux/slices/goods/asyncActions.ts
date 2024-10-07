import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import api from '@/api/apiInstance';
// import { handleShowSizeTable } from '@/lib/utils/common'
// import { IProduct, IProducts, ILoadOneProduct, ILoadProductsByFilter, ILoadWatchedProducts } from './types';

// Асинхронные экшены для взаимодействия с API

// export const loadProductBySearch = createAsyncThunk(
// 	'goods/loadProductBySearch',
// 	async ({ search }: { search: string }, thunkAPI) => {
// 		try {
// 			const { data } = await api.post('/api/goods/search', { search });
// 			return data;
// 		} catch (error) {
// 			toast.error((error as Error).message);
// 			return thunkAPI.rejectWithValue(error.message);
// 		}
// 	}
// );

// export const loadOneProduct = createAsyncThunk(
// 	'goods/loadOneProduct',
// 	async ({ productId, category, setSpinner, withShowingSizeTable }: ILoadOneProduct, thunkAPI) => {
// 		try {
// 			setSpinner && setSpinner(true);
// 			const { data } = await api.post('/api/goods/one', { productId, category });

// 			if (withShowingSizeTable) {
// 				// handleShowSizeTable — функционал для показа таблицы размеров
// 				handleShowSizeTable(data.productItem);
// 			}

// 			if (data?.message === 'Wrong product id') {
// 				return { productItem: { errorMessage: 'Wrong product id' } };
// 			}

// 			return data;
// 		} catch (error) {
// 			toast.error((error as Error).message);
// 			return thunkAPI.rejectWithValue(error.message);
// 		} finally {
// 			setSpinner && setSpinner(false);
// 		}
// 	}
// );

// export const loadProductsByFilter = createAsyncThunk(
// 	'goods/loadProductsByFilter',
// 	async ({ limit, offset, category, isCatalog, additionalParam }: ILoadProductsByFilter, thunkAPI) => {
// 		try {
// 			const { data } = await api.get(
// 				`/api/goods/filter?limit=${limit}&offset=${offset}&category=${category}&${additionalParam}${isCatalog ? '&catalog=true' : ''
// 				}`
// 			);
// 			return data;
// 		} catch (error) {
// 			toast.error((error as Error).message);
// 			return thunkAPI.rejectWithValue(error.message);
// 		}
// 	}
// );

// export const loadWatchedProducts = createAsyncThunk(
// 	'goods/loadWatchedProducts',
// 	async ({ payload }: ILoadWatchedProducts, thunkAPI) => {
// 		try {
// 			const { data } = await api.post('/api/goods/watched', { payload });
// 			return data;
// 		} catch (error) {
// 			toast.error((error as Error).message);
// 			return thunkAPI.rejectWithValue(error.message);
// 		}
// 	}
// );

export const getNewProducts = createAsyncThunk(
	'goods/getNewProducts',
	async (_, thunkAPI) => {
		try {
			const { data } = await api.get('/api/goods/new');
			return data;
		} catch (error) {
			toast.error((error as Error).message);
			return thunkAPI.rejectWithValue((error as Error).message);
		}
	}
);

export const getBestsellerProducts = createAsyncThunk(
	'goods/getBestsellerProducts',
	async (_, thunkAPI) => {
		try {
			const { data } = await api.get('/api/goods/bestsellers');
			return data;
		} catch (error) {
			toast.error((error as Error).message);
			return thunkAPI.rejectWithValue((error as Error).message);
		}
	}
);