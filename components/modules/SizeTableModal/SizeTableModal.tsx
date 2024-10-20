import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import { selectSelectedSizes } from '@/redux/slices/sizeTable/selectors';

import { useLang } from '@/hooks/useLang';
import { useCartActions } from '@/hooks/useCartActions';
// import { closeSizeTableByCheck, isUserAuth } from '@/lib/utils/common';
import { basePropsForMotion } from '@/constants/motion';

import ProductCountBySize from '../ProductsListItem/ProductCountBySize';

import { ISizeTableModal } from '@/types/modules';

const SizeTableModal = ({ handleCloseModal }: ISizeTableModal) => {
	const { translations } = useLang();

	const { currentProduct, selectedSize, setSelectedSize } =
		useCartActions(true);

	// TODO чёт не то тут получаю со стора как мне кажется
	const productSizes = useSelector(selectSelectedSizes);
	// const isHatsTypes = productSizes.type === 'hats';

	// const productSizes =
	const isHatsType = false;

	// Размеры определить в enum а не в interface кака сейчасс и сюда передавать просто в args вместе 's'
	const handleSelectSizeS = () => setSelectedSize('s');
	const handleSelectSizeL = () => setSelectedSize('l');
	const handleSelectSizeM = () => setSelectedSize('m');
	const handleSelectSizeXL = () => setSelectedSize('xl');
	const handleSelectSizeXXL = () => setSelectedSize('xxl');

	const isSizeSelected = (size: string) => selectedSize === size

	const handleAddProductToFavorites = () => {
		toast.success('Добавлено в избранное!');
		return;
	};

	// const addToCart = () => handleAddToCart(+(cartItemBySize?.count || 1))
// TODO выносить такой код ибо массивы тоже перерендерятся
	const hatsSizes = [
		{
			id: 1,
			headCircumference: '55',
			manufacturerSize: 'S',
			selectHandler: handleSelectSizeS,
			isSelected: isSizeSelected('s'),
			isAvailable: productSizes.sizes.s,
			// isInFavorites: checkInFavorites('s'),
		},
		{
			id: 2,
			headCircumference: '56-57',
			manufacturerSize: 'M',
			selectHandler: handleSelectSizeM,
			isSelected: isSizeSelected('m'),
			isAvailable: productSizes.sizes.m,
			// isInFavorites: checkInFavorites('m'),
		},
		{
			id: 3,
			headCircumference: '58-59',
			manufacturerSize: 'L',
			selectHandler: handleSelectSizeL,
			isSelected: isSizeSelected('l'),
			isAvailable: productSizes.sizes.l,
			// isInFavorites: checkInFavorites('l'),
		},
		{
			id: 4,
			headCircumference: '60-61',
			manufacturerSize: 'XL',
			selectHandler: handleSelectSizeXL,
			isSelected: isSizeSelected('xl'),
			isAvailable: productSizes.sizes.xl,
			// isInFavorites: checkInFavorites('xl'),
		},
		{
			id: 5,
			headCircumference: '62-63',
			manufacturerSize: 'XXL',
			selectHandler: handleSelectSizeXXL,
			isSelected: isSizeSelected('xxl'),
			isAvailable: productSizes.sizes.xxl,
			// isInFavorites: checkInFavorites('xxl'),
		},
	];

	const clothSizes = [
		{
			id: 1,
			russianSize: '44-46',
			manufacturerSize: 'S',
			bust: '78-82',
			waist: '58-62',
			hipGirth: '86-90',
			selectHandler: handleSelectSizeS,
			isSelected: isSizeSelected('s'),
			isAvailable: productSizes.sizes.s,
			// isInFavorites: checkInFavorites('s'),
		},
		{
			id: 2,
			russianSize: '48-50',
			manufacturerSize: 'M',
			bust: '82-86',
			waist: '62-66',
			hipGirth: '90-94',
			selectHandler: handleSelectSizeM,
			isSelected: isSizeSelected('m'),
			isAvailable: productSizes.sizes.m,
			// isInFavorites: checkInFavorites('m'),
		},
		{
			id: 3,
			russianSize: '50',
			manufacturerSize: 'L',
			bust: '86-90',
			waist: '66-70',
			hipGirth: '94-98',
			selectHandler: handleSelectSizeL,
			isSelected: isSizeSelected('l'),
			isAvailable: productSizes.sizes.l,
			// isInFavorites: checkInFavorites('l'),
		},
		{
			id: 4,
			russianSize: '52-54',
			manufacturerSize: 'XL',
			bust: '90-94',
			waist: '70-74',
			hipGirth: '98-102',
			selectHandler: handleSelectSizeXL,
			isSelected: isSizeSelected('xl'),
			isAvailable: productSizes.sizes.xl,
			// isInFavorites: checkInFavorites('xl'),
		},
		{
			id: 5,
			russianSize: '56',
			manufacturerSize: 'XXL',
			bust: '94-98',
			waist: '74-78',
			hipGirth: '102-106',
			selectHandler: handleSelectSizeXXL,
			isSelected: isSizeSelected('xxl'),
			isAvailable: productSizes.sizes.xxl,
			// isInFavorites: checkInFavorites('xxl'),
		},
	];

	const trProps = (
		item:
			| {
					id: number;
					russianSize: string;
					manufacturerSize: string;
					bust: string;
					waist: string;
					hipGirth: string;
					selectHandler: () => void;
					isSelected: boolean;
					isAvailable: boolean;
			  }
			| {
					id: number;
					headCircumference: string;
					manufacturerSize: string;
					selectHandler: () => void;
					isSelected: boolean;
					isAvailable: boolean;
			  }
	) => ({
		onClick: item.selectHandler,
		style: {
			backgroundColor:
				item.isSelected || selectedSize === item.manufacturerSize.toLowerCase()
					? '#9466FF'
					: 'transparent',
			pointerEvents: item.isAvailable ? 'auto' : 'none',
			cursor: item.isAvailable ? 'pointer' : 'not-allowed',
			opacity: item.isAvailable ? 1 : 0.5,
			color: item.isAvailable ? '#fff' : 'rgba(255, 255, 255, .2)',
		},
	});

	return (
		<motion.div
			{...basePropsForMotion}
			className={`modal size-table-modal ${'size-table'} ${
				isHatsType ? 'size-table--hats' : ''
			}`}
		>
			<button className={`modal__close${'size-table__close'}`} onClick={handleCloseModal}>
				close
			</button>
			<h2 className={'size-table__title'}>{translations.size_table.title}</h2>
			<div className={'size-table__inner'}>
				<table className={'size-table__table'}>
					<thead>
						{isHatsType ? (
							<tr>
								<th>{translations.size_table.head_circumference}</th>
								<th>{translations.size_table.size}</th>
							</tr>
						) : (
							<tr>
								<th>{translations.size_table.russian_size}</th>
								<th>{translations.size_table.manufacturer_size}</th>
								<th>{translations.size_table.chest_circumference}</th>
								<th>{translations.size_table.waist_circumference}</th>
								<th>{translations.size_table.hip_circumference}</th>
							</tr>
						)}
					</thead>
					<tbody>
						{isHatsType
							? hatsSizes.map((hatsSizesItem) => (
									<tr
										key={hatsSizesItem.id}
										{...(trProps(
											hatsSizesItem
										) as React.HTMLAttributes<HTMLTableRowElement>)}
									>
										<td>
											{hatsSizesItem.isInFavorites && (
												<span className={'size-table__favorite'} />
											)}
											{hatsSizesItem.headCircumference}
										</td>
										<td>
											<ProductCountBySize
												size={hatsSizesItem.manufacturerSize}
												products={currentCartItems}
											/>
											{hatsSizesItem.manufacturerSize}
										</td>
									</tr>
							  ))
							: clothSizes.map((item) => (
									<tr
										key={item.id}
										{...(trProps(
											item
										) as React.HTMLAttributes<HTMLTableRowElement>)}
									>
										<td>
											{item.isInFavorites && (
												<span className={'size-table__favorite'} />
											)}
											{item.russianSize}
										</td>
										<td>{item.manufacturerSize}</td>
										<td>{item.bust}</td>
										<td>{item.waist}</td>
										<td>
											{/* <ProductCountBySize
												size={item.manufacturerSize}
												currentCartItems={[]}
											/> */}
											{item.hipGirth}
										</td>
									</tr>
							  ))}
					</tbody>
				</table>
			</div>
			{/* <AddToCartBtn
				className={`${size-table__btn} ${size-table__btn_favorite}`}
				handleAddToCart={
					isAddToFavorites ? handleAddProductToFavorites : addToCart
				}
				addToCartSpinner={
					addToCartSpinner || updateCountSpinner || addToFavoritesSpinner
				}
				btnDisabled={
					!!!selectedSize ||
					addToCartSpinner ||
					updateCountSpinner ||
					addToFavoritesSpinner
				}
				text={
					isAddToFavorites
						? translations.product.to_favorite
						: translations.product.to_cart
				}
			/> */}
		</motion.div>
	);
};

export default SizeTableModal;
