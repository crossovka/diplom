import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { getNewProducts } from '@/redux/slices/goods/asyncActions';
import { selectNewProducts, selectNewProductsLoading } from '@/redux/slices/goods/selectors';

import { useEffect } from 'react';
import { useLang } from '@/hooks/useLang';

import HomePageSection from '../HomePageSection/HomePageSection';

const NewGoods: React.FC = () => {
	const dispatch = useAppDispatch();
	const newProducts = useSelector(selectNewProducts);
	const isNewProductsLoading = useSelector(selectNewProductsLoading);

	const { translations } = useLang();

	useEffect(() => {
		dispatch(getNewProducts());
	}, [dispatch]);
	// }, []);

	return (
		<section>
			<HomePageSection
				title={translations.homePage.newGoods.title}
				goods={newProducts}
				isLoading={isNewProductsLoading}
			/>
		</section>
	);
};

export default NewGoods;
