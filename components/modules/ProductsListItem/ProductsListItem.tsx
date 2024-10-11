import Link from 'next/link';
import Image from 'next/image';

import { useAppDispatch } from '@/redux/store';
import { openQuickViewModal } from '@/redux/slices/modals/slice';

import { setCurrentProduct } from '@/redux/slices/goods/slice';

// import { useEffect } from 'react';
import { useLang } from '@/hooks/useLang';
import useImagePreloader from '@/hooks/useImagePreloader';

import { addOverflowHiddenToHtml, formatPrice } from '@/lib/utils/common';

import ProductLabel from './ProductLabel';
import ProductAvailable from './ProductAvailable';
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn';

import { IProductsListItemProps } from '@/types/modules';

const ProductsListItem = ({ item, title }: IProductsListItemProps) => {
	const dispatch = useAppDispatch();

	const { handleLoadingImageComplete, loadingImageClass } = useImagePreloader();
	const { translations } = useLang();

	// Заголовок (Секции заголовок мол Хиты продаж и новинки с карточками)
	// передаётся в компонент чтобы потом отображать только лэйбл Новинка или Хит продаж
	// Если !New тайтл то тодга бестселлеры
	// Тайтл не обязательный проп. Если он передаётся то мы на главной в секции только новинок или только бестселлеров
	const isTitleForNew = title === translations.homePage.newGoods.title;

	const handleShowQuickViewModal = () => {
		addOverflowHiddenToHtml()
		dispatch(openQuickViewModal());
		dispatch(setCurrentProduct(item));
	};

	// const addToCart = () => {
	//   setIsAddToFavorites(false)
	//   addProductToCartBySizeTable(item, setAddToCartSpinner, 1)
	// }

	// useEffect(() => {
	// 	console.log(item);
	// }, [item]);

	return (
		<li>
			{title ? <></> : <></>}
			{isTitleForNew && (
				<ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
			)}
			<div>
				{/* <ProductItemActionBtn
					text={translations.product.add_to_favorites}
					iconClass={'--favorites'}
				/>
				<ProductItemActionBtn
					text={translations.product.add_to_comparison}
					iconClass={'--comparison'}
				/> */}
				<ProductItemActionBtn
					text={translations.product.quick_view}
					iconClass={'--quick-view'}
					callback={handleShowQuickViewModal}
				/>
			</div>
			<Link
				href={`/catalog/${item.category}/${item._id}`}
				className={'-ibg -ibg_contain'}
				style={{ paddingBottom: '45%', display: 'block' }}
			>
				<Image
					src={item.images[0]}
					alt={item.name}
					fill
					className={loadingImageClass}
					onLoad={handleLoadingImageComplete}
				/>
			</Link>
			<div>
				<h5>
					<Link href={`/catalog/${item.category}/${item._id}`}>
						{item.name}
					</Link>
				</h5>
				<ProductAvailable
					vendorCode={item.vendorCode}
					// + это унарный оператор чтобы преобразовать в число если можно
					inStock={+item.inStock}
				/>
				<span>{formatPrice(+item.price)} ₽</span>
			</div>
			{/* {productsWithoutSizes.includes(item.type) ? ( */}
			{/* <></> */}
			{/* ) : ( */}
			<button
			// className={}
			// onClick={addToCart}
			>
				{/* // TODO ну если даже всего один размер писало мол добавлено XL или если это очки к примеру то писало добавлено  */}
				{translations.product.to_cart}
			</button>
			{/* )} */}
		</li>
	);
};

export default ProductsListItem;
