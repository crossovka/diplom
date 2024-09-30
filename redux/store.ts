'use client'

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import lang from './slices/lang/slice';

export const store = configureStore({
	reducer: {
		lang,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// console.log('store', store);
// console.log('store.getState', store.getState());
// console.log('store.dispatch', store.dispatch);