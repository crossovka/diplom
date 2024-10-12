import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { selectCurrentProduct } from '@/redux/slices/goods/selectors';

import { useState } from 'react';

export const useCartActions = (isSizeTable = false) => {
	const dispatch = useAppDispatch();
	const currentProduct = useSelector(selectCurrentProduct)
	const [selectedSize, setSelectedSize] = useState('')

	// if (isSizeTable) {
	// 	// addItemToCart(
	// 	// 	product,
	// 	// 	setAddToCartSpinner,
	// 	// 	countFromCounter || 1,
	// 	// 	selectedSize
	// 	// )
	// 	return
	// }

	return {
		currentProduct,
		selectedSize,
		setSelectedSize,
	}
}