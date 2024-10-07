import Link from 'next/link';
import Image from 'next/image';

// import useImagePreloader from '@/hooks/useImagePreloader';

import { IProductsListItemProps } from '@/types/modules';

// Зачем тайтл то передавать если можно с item вытащить? для рекламных блоков или чо?
const ProductsListItem = ({ item, title }: IProductsListItemProps) => {
	// const { handleLoadingImageComplete, loadingImageClass } = useImagePreloader();

	// const handleShowQuickViewModal = () => {
	//   addOverflowHiddenToBody()
	//   showQuickViewModal()
	//   setCurrentProduct(item)
	// }

	// const addToCart = () => {
	//   setIsAddToFavorites(false)
	//   addProductToCartBySizeTable(item, setAddToCartSpinner, 1)
	// }

	return (
		<li>
			<h5>{title}</h5>
			<span>{`${item.isBestseller} ${item.isNew}`}</span>
			<Link
				href={`/catalog/${item.category}/${item._id}`}
				className={'-ibg -ibg_contain'}
				style={{ paddingBottom: '45%', display: 'block' }}
			>
				<Image
					src={item.images[0]}
					alt={item.name}
					fill
					// className={loadingImageClass}
					// onLoad={handleLoadingImageComplete}
				/>
			</Link>
		</li>
	);
};

export default ProductsListItem;
