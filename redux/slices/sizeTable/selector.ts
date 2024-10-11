import { RootState } from "@/redux/store";

export const selectSelectedSizes = (state: RootState) => state.sizeTable.selectedSizes;