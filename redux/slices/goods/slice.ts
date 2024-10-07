'use client'

import { createSlice } from '@reduxjs/toolkit';
import { getBestsellerProducts, getNewProducts } from './asyncActions';
import { IProduct } from '@/types/common';
import { IProducts } from './types';

const goodsSlice = createSlice({
	name: 'goods',
	initialState: {
		newProducts: [] as IProduct[],
		bestsellerProducts: [] as IProduct[],
		currentProduct: {} as IProduct,
		products: {} as IProducts,
		watchedProducts: {} as IProducts,
		productsBySearch: {} as IProducts,
		// TODO какое должно быть изначально и какое при ошибке? зачем тогда пендинг если изначально тру?
		isLoadingNewProducts: false,
		isLoadingBestsellerProducts: false,
		error: null as string | null,
	},
	reducers: {
		resetProductBySearch(state) {
			state.productsBySearch = { count: 0, items: [] };
		},
	},
	extraReducers: (builder) => {
		builder
			// Обработка асинхронных экшенов для товаров
			// получение новинок
			.addCase(getNewProducts.pending, (state) => {
				state.isLoadingNewProducts = true;
				state.error = null;
			})
			.addCase(getNewProducts.fulfilled, (state, action) => {
				state.newProducts = action.payload;
				state.isLoadingNewProducts = false;
			})
			.addCase(getNewProducts.rejected, (state, action) => {
				state.isLoadingNewProducts = false;
				state.error = action.payload as string;
			})
			// Получение хитов
			.addCase(getBestsellerProducts.pending, (state) => {
				state.isLoadingBestsellerProducts = true;
				state.error = null;
			})
			.addCase(getBestsellerProducts.fulfilled, (state, action) => {
				state.bestsellerProducts = action.payload;
				state.isLoadingBestsellerProducts = false;
			})
			.addCase(getBestsellerProducts.rejected, (state, action) => {
				state.isLoadingBestsellerProducts = false;
				state.error = action.payload as string;
			});
		// .addCase(loadOneProduct.fulfilled, (state, action) => {
		// 	state.currentProduct = action.payload.productItem;
		// })
		// .addCase(loadProductsByFilter.fulfilled, (state, action) => {
		// 	state.products = action.payload;
		// })
		// .addCase(loadWatchedProducts.fulfilled, (state, action) => {
		// 	state.watchedProducts = action.payload;
		// })
		// .addCase(loadProductBySearch.fulfilled, (state, action) => {
		// 	state.productsBySearch = action.payload;
		// })
	},
});

export const { resetProductBySearch } = goodsSlice.actions;
export default goodsSlice.reducer;