import { useLang } from '@/hooks/useLang';
import { IProductLabelProps } from '@/types/modules';

const ProductLabel = ({ isNew, isBestseller }: IProductLabelProps) => {
	const { translations } = useLang();

	const bestsellerLabel = <span>{translations.product.is_bestseller}</span>;

	const newLabel = <span>{translations.product.is_new}</span>;

	const allLabel = (
		<div>
			<span>{translations.product.is_new}</span>
			<span>{translations.product.is_bestseller}</span>
		</div>
	);

	if (isNew && isBestseller) {
		return allLabel;
	}

	if (isBestseller) {
		return bestsellerLabel;
	}

	return newLabel;
};

export default ProductLabel;