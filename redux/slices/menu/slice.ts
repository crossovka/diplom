import { createSlice } from '@reduxjs/toolkit';

export interface MenuState {
	isMenuOpen: boolean
	isCatalogOpen: boolean
}

export const initialState: MenuState = {
	isMenuOpen: false,
	isCatalogOpen: false,
};

const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		openMenu: (state) => {
			state.isMenuOpen = true;
			// TODO FIX вынести в ui в Handle функции закрыте? чтобы было только !boolean
			state.isCatalogOpen = false; // Закрываем каталог при открытии меню
		},
		closeMenu: (state) => {
			state.isMenuOpen = false;
		},
		toggleMenu: (state) => {
			state.isMenuOpen = !state.isMenuOpen;
			state.isCatalogOpen = false; // Закрываем каталог при переключении меню
		},
		openCatalogMenu: (state) => {
			state.isCatalogOpen = true;
			state.isMenuOpen = false; // Закрываем меню при открытии каталога
		},
		closeCatalogMenu: (state) => {
			state.isCatalogOpen = false;
		},
		toggleCatalogMenu: (state) => {
			state.isCatalogOpen = !state.isCatalogOpen;
			state.isMenuOpen = false; // Закрываем меню при переключении каталога
		},
	},
});

export const {
	openMenu,
	closeMenu,
	toggleMenu,
	openCatalogMenu,
	closeCatalogMenu,
	toggleCatalogMenu,
} = menuSlice.actions;

export default menuSlice.reducer;