import { RootState } from "@/redux/store";

export const selectNewProductsLoading = (state: RootState) => state.goods.isLoadingNewProducts;
export const selectBestsellerProductsLoading = (state: RootState) => state.goods.isLoadingBestsellerProducts;

export const selectNewProducts = (state: RootState) => state.goods.newProducts
export const selectBestsellerProducts = (state: RootState) => state.goods.bestsellerProducts