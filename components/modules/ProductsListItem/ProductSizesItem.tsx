'use client'
import ProductCountBySize from './ProductCountBySize'

import { IProductSizesItemProps } from '@/redux/slices/sizeTable/types'

const ProductSizesItem = ({
	currentSize,
	selectedSize,
	setSelectedSize,
	currentCartItems,
}: IProductSizesItemProps) => {
	// первый элемент массива это буква размера а второе это булево значение
	const handleSelectSize = () => setSelectedSize(currentSize[0])

	return (
		// TODO заменить на button и помимо класса просто дисайблед делать
		<li
			className={`${'product-sizes__item'} ${currentSize[1]
					? ''
					: 'product-sizes__item--not-available'
				}`}
			style={{
				backgroundColor:
					currentSize[0] === selectedSize
						? '#9466FF'
						: 'rgba(255, 255, 255, 0.10)',
			}}
		>
			<ProductCountBySize
				size={currentSize[0]}
				products={currentCartItems}
				withCartIcon={false}
			/>
			<button onClick={handleSelectSize}>
				{currentSize[0].toLocaleUpperCase()}
			</button>
		</li>
	)
}

export default ProductSizesItem
