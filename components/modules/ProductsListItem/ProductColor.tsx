'use client'
import { useLang } from '@/hooks/useLang'
import { IProductColorProps } from '@/types/modules'

const ProductColor = ({ color, className }: IProductColorProps) => {
	const { translations } = useLang()

	return (
		<span className={`${''} ${className || ''}`}>
			<span>{translations.product.color}:</span>{' '}
			{(translations.product.colors as { [index: string]: string })[color]}
		</span>
	)
}

export default ProductColor