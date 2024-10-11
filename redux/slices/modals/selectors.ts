import { RootState } from "../../store";

export const selectIsSearchModalOpen = (state: RootState) => state.modals.isSearchModalOpen;
export const selectIsQuickViewModalOpen = (state: RootState) => state.modals.isQuickViewModalOpen;
export const selectIsSizeTableModalOpen = (state: RootState) => state.modals.isSizeTableModalOpen;