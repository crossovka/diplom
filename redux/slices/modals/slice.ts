import { createSlice } from '@reduxjs/toolkit';

interface ModalsState {
	isSearchModalOpen: boolean;
	isQuickViewModalOpen: boolean;
	isSizeTableModalOpen: boolean;
}

export const initialState: ModalsState = {
	isSearchModalOpen: false,
	isQuickViewModalOpen: false,
	isSizeTableModalOpen: false,
};

const modalsSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		// Модалка поиска товаров
		openSearchModal: (state) => {
			state.isSearchModalOpen = true;
		},
		closeSearchModal: (state) => {
			state.isSearchModalOpen = false;
		},
		// Модалка быстрого просмотра товара
		openQuickViewModal: (state) => {
			state.isQuickViewModalOpen = true;
		},
		closeQuickViewModal: (state) => {
			state.isQuickViewModalOpen = false;
		},
		// Модалка таблицы размеров
		openSizeTableModal: (state) => {
			state.isSizeTableModalOpen = true;
		},
		closeSizeTableModal: (state) => {
			state.isSizeTableModalOpen = false;
		},
	},
});

export const { openSearchModal, closeSearchModal, openQuickViewModal, closeQuickViewModal, openSizeTableModal, closeSizeTableModal } = modalsSlice.actions;

export default modalsSlice.reducer;