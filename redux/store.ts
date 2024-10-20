'use client'

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector, useStore } from 'react-redux';

import lang from './slices/lang/slice';
import menu from './slices/menu/slice';
import modals from './slices/modals/slice';
import goods from './slices/goods/slice';
import sizeTable from './slices/sizeTable/slice';
import auth from './slices/auth/slice';
import user from './slices/user/slice';

export const store = configureStore({
	reducer: {
		lang,
		menu,
		modals,
		goods,
		sizeTable,
		// TODO user добавляется только после логин чек в редакс
		auth,
		user
	},
});
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Типизированный useDispatch для dispatch'а действий
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Типизированный useSelector для выбора данных из хранилища
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Типизированный useStore для хранилища
export const useAppStore = useStore.withTypes<AppStore>()

// console.log('store', store);
// console.log('store.getState', store.getState());
// console.log('store.dispatch', store.dispatch);