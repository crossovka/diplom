'use client';
import { useLang } from '@/hooks/useLang';

const ProductComposition = ({ composition }: { composition: string }) => {
	const { translations } = useLang();

	return (
		<span className={''}>
			{/* // TODO типизировать */}
			{translations.product.composition}: {translations.product.compositions[composition]}
		</span>
	);
};

export default ProductComposition;
