import Link from 'next/link';

import { useAppDispatch } from '@/redux/store';
import { closeQuickViewModal } from '@/redux/slices/modals/slice';

import { useLang } from '@/hooks/useLang';
import { useCartAction } from '@/hooks/useCartActions';
import { formatPrice, removeOverflowHiddenFromHtml } from '@/lib/utils/common';

import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn';
import QuickViewModalSlider from './QuickViewModalSlider';
import ProductAvailable from '../ProductsListItem/ProductAvailable';
import ProductColor from '../ProductsListItem/ProductColor';
import ProductComposition from '../ProductsListItem/ProductComposition';
import ProductSizeTableBtn from '../ProductsListItem/ProductSizeTableBtn';
import ProductSizesItem from '../ProductsListItem/ProductSizesItem';
import AddToCartBtn from '../ProductsListItem/AddToCartBtn';

const QuickViewModal = () => {
	const dispatch = useAppDispatch();

	const { translations } = useLang();
	const { currentProduct, selectedSize, setSelectedSize } = useCartAction();

	const handleCloseModal = () => {
		removeOverflowHiddenFromHtml();
		dispatch(closeQuickViewModal());
	};

	const addToCart = () => {
		// setIsAddToFavorites(false);
		// handleAddToCart(count);
	};

	return (
		<div className={'quick-view-modal'}>
			<button
				className={'quick-view-modal__close'}
				onClick={handleCloseModal}
			/>
			<div>
				{/* <ProductItemActionBtn
					text={translations.product.add_to_favorites}
					iconClass={'--favorites'}
					withTooltip={false}
				/>
				<ProductItemActionBtn
					text={translations.product.add_to_comparison}
					iconClass={'--comparison'}
					withTooltip={false}
				/> */}
			</div>
			<div className={'quick-view-modal__left'}>
				<QuickViewModalSlider images={currentProduct.images} />
			</div>
			<div className={'quick-view-modal__right'}>
				<h5>{currentProduct.name}</h5>
				<span>{formatPrice(+currentProduct.price)} ₽</span>
				<div>
					<ProductAvailable
						vendorCode={currentProduct.vendorCode}
						inStock={+currentProduct.inStock}
					/>
					<ProductColor color={currentProduct.characteristics.color} />
					{currentProduct.characteristics?.composition && (
						<ProductComposition
							composition={currentProduct.characteristics.composition}
						/>
					)}
					{Object.keys(currentProduct.sizes).length ? (
						<div>
							<div>
								<span>{translations.product.size}</span>
								<ProductSizeTableBtn
									sizes={currentProduct.sizes}
									type={currentProduct.type}
									className={`${''}`}
								/>
							</div>
							<ul>
								{/* key - XL value - boolean */}
								{Object.entries(currentProduct.sizes).map(([key, value], i) => (
									<ProductSizesItem
										key={i}
										currentSize={[key, value as boolean]}
										selectedSize={selectedSize}
										setSelectedSize={setSelectedSize}
										// TODO когда логику корзины сделаю из хука useCartActions вытащить
										currentCartItems={[]}
									/>
								))}
							</ul>
						</div>
					) : (
						''
					)}
					<div>
						<span>{translations.product.count}</span>
						<div>
							{/* Проверка на то не пустая ли это строчка (в стейте в хуке useCartActions она пуста by default) */}
							{!!selectedSize ? (
								// Счётчик будет основываться на количестве выбранного размера в корзине
								<>Есть размер???</>
							) : (
								// <ProductCounter
								// 	className={``}
								// 	count={count}
								// 	totalCount={+currentProduct.inStock}
								// 	initialCount={+(existingItem?.count || 1)}
								// 	setCount={setCount}
								// 	cartItem={existingItem as ICartItem}
								// 	updateCountAsync={false}
								// />
								// <></>
								<div
									className={`counter ${''}`}
									style={{ justifyContent: 'center' }}
								>
									<span>
										нет размера???
										{translations.product.total_in_cart}{' '}
										{/* {allCurrentCartItemCount} */}
									</span>
								</div>
							)}
							<AddToCartBtn
								className={''}
								text={translations.product.to_cart}
								handleAddToCart={addToCart}
								// addToCartSpinner={addToCartSpinner || updateCountSpinner}
								// btnDisabled={
								// 	addToCartSpinner ||
								// 	updateCountSpinner ||
								// 	allCurrentCartItemCount === +currentProduct.inStock
								// }
							/>
						</div>
					</div>
				</div>

				<div className={'styles.modal__right__more'}>
					<Link
						href={`/catalog/${currentProduct.category}/${currentProduct._id}`}
						className={'styles.modal__right__more__link'}
						onClick={handleCloseModal}
					>
						{translations.product.more}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default QuickViewModal;