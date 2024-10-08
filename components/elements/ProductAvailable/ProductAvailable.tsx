import { useLang } from '@/hooks/useLang';
import { IProductAvailableProps } from '@/types/elements';

const ProductAvailable = ({ vendorCode, inStock }: IProductAvailableProps) => {
	const isInStock = +inStock > 0;
	const { translations } = useLang();

	return (
		<div>
			<span className={`${'stock'} ${isInStock ? 'green' : 'red'}`}>
				{isInStock
					? translations.product.available
					: translations.product.not_available}
			</span>
			<span>
				{translations.product.vendor_code}.: {vendorCode}
			</span>
		</div>
	);
};

export default ProductAvailable;
