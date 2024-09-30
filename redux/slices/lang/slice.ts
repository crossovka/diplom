'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LangSliceState, AllowedLangs } from './types';

const initialState: LangSliceState = {
	currentLang: AllowedLangs.RU,
};

const langSlice = createSlice({
	name: 'lang',
	initialState,
	reducers: {
		setLang(state, action: PayloadAction<AllowedLangs>) {
			state.currentLang = action.payload;
		},
	},
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;