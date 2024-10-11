import { ICartItem } from "../cart/types"

export interface ISizes {
	s: boolean
	l: boolean
	m: boolean
	xl: boolean
	xxl: boolean
}

export interface ISelectedSizes {
	sizes: ISizes
	type: string
	className?: string
}

export interface SizeTableState {
	selectedSizes: ISelectedSizes;
}

export interface IProductSizesItemProps {
	currentSize: [string, boolean]
	selectedSize: string
	setSelectedSize: (arg0: string) => void
	currentCartItems: ICartItem[]
}