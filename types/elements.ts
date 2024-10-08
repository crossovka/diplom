export interface IProductItemActionBtnProps {
	text: string
	iconClass: string
	spinner?: boolean
	callback?: VoidFunction
	withTooltip?: boolean
	marginBottom?: number
}

export interface IProductAvailableProps {
	vendorCode: string
	inStock: number
}