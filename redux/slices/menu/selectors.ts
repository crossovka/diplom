import { RootState } from "../../store";

export const selectIsMenuOpen = (state: RootState) => state.menu.isMenuOpen;
export const selectIsCatalogOpen = (state: RootState) => state.menu.isCatalogOpen;