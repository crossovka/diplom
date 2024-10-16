'use client'

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import lang from './slices/lang/slice';
import menu from './slices/menu/slice';
import modals from './slices/modals/slice';
import goods from './slices/goods/slice';
import sizeTable from './slices/sizeTable/slice';

export const store = configureStore({
	reducer: {
		lang,
		menu,
		modals,
		goods,
		sizeTable
	},
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// console.log('store', store);
// console.log('store.getState', store.getState());
// console.log('store.dispatch', store.dispatch);