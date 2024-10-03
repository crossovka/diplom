import { createSlice } from '@reduxjs/toolkit';

interface ModalsState {
	isSearchModalOpen: boolean;
}

export const initialState: ModalsState = {
	isSearchModalOpen: false,
};

const modalsSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		openSearchModal: (state) => {
			state.isSearchModalOpen = true;
		},
		closeSearchModal: (state) => {
			state.isSearchModalOpen = false;
		}
	},
});

export const { openSearchModal, closeSearchModal } = modalsSlice.actions;

export default modalsSlice.reducer;