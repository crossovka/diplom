export interface ICartItem {
	_id: string
	clientId: string
	userId: string
	productId: string
	image: string
	name: string
	size: string
	count: string | number
	price: string
	totalPrice: string
	inStock: string
	color: string
	category: string
}

export interface IAddToCartBtnProps {
	handleAddToCart: VoidFunction
	addToCartSpinner: boolean
	text: string
	btnDisabled?: boolean
	className?: string
}