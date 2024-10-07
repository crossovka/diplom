import { IProduct } from "@/types/common"

// export interface IGoodsSliceState {}

export interface IProducts {
	count: number
	items: IProduct[]
}

export interface ILoadOneProduct {
	productId: string
	category: string
	setSpinner?: (arg0: boolean) => void
	withShowingSizeTable?: boolean
}

export interface ILoadProductsByFilter {
	limit: number
	offset: number
	category: string
	additionalParam?: string
	isCatalog?: boolean
}

export interface ILoadOneProduct {
	productId: string
	category: string
	setSpinner?: (arg0: boolean) => void
	withShowingSizeTable?: boolean
}
export interface ILoadWatchedProducts {
	payload: { _id: string; category: string }[]
}