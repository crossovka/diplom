import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { selectCurrentProduct } from '@/redux/slices/goods/selectors';

import { useState } from 'react';

export const useCartAction = () => {
	const dispatch = useAppDispatch();
	const currentProduct = useSelector(selectCurrentProduct)
	const [selectedSize, setSelectedSize] = useState('')

	return {
		currentProduct,
		selectedSize,
		setSelectedSize,
	}
}