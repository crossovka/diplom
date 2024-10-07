import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { getBestsellerProducts } from '@/redux/slices/goods/asyncActions';
import {selectBestsellerProducts, selectBestsellerProductsLoading } from '@/redux/slices/goods/selectors';

import { useEffect } from 'react';
import { useLang } from '@/hooks/useLang';

import HomePageSection from '../HomePageSection/HomePageSection';

const BestsellersGoods: React.FC = () => {
	const dispatch = useAppDispatch();
	const bestSellers = useSelector(selectBestsellerProducts);

	const isBestSellersLoading = useSelector(selectBestsellerProductsLoading);

	const { translations } = useLang();

	useEffect(() => {
		dispatch(getBestsellerProducts());
	}, [dispatch]);
	// }, []);

	return (
		<section>
			<HomePageSection
				title={translations.homePage.bestSellers.title}
				goods={bestSellers}
				isLoading={isBestSellersLoading}
			/>
		</section>
	);
};

export default BestsellersGoods;