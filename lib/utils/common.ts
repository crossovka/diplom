import { ICartItem } from "@/redux/slices/cart/types"

export const getWindowWidth = () => {
	const { innerWidth: windowWidth } =
		typeof window !== 'undefined' ? window : { innerWidth: 0 }

	return { windowWidth }
}

export const formatPrice = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

// export const idGenerator = () => {
// 	const S4 = () =>
// 		(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
// 	return (
// 		S4() +
// 		S4() +
// 		'-' +
// 		S4() +
// 		'-' +
// 		S4() +
// 		'-' +
// 		S4() +
// 		'-' +
// 		S4() +
// 		S4() +
// 		S4()
// 	)
// }

export const shuffle = <T>(array: T[]) => {
	let currentIndex = array.length,
		randomIndex

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--
			;[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
	}

	return array
}

export const getCartItemCountBySize = (cartItems: ICartItem[], currentSize: string) => cartItems.find((item) => item.size === currentSize.toLocaleLowerCase())?.count || 0