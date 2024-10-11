import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISelectedSizes, SizeTableState } from './types';

const initialState: SizeTableState = {
	selectedSizes: {} as ISelectedSizes,
};

const sizeTableSlice = createSlice({
	name: 'sizeTable',
	initialState,
	reducers: {
		setSizeTableSizes(state, action: PayloadAction<ISelectedSizes>) {
			state.selectedSizes = action.payload;
		},
	},
});

export const { setSizeTableSizes } = sizeTableSlice.actions;
export default sizeTableSlice.reducer;