import { RootState } from "../../store";

export const selectIsSearchModalOpen = (state: RootState) => state.modals.isSearchModalOpen;