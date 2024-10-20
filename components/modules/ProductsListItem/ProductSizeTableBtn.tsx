'use client';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { setSizeTableSizes } from '@/redux/slices/sizeTable/slice';
import { openSizeTableModal } from '@/redux/slices/modals/slice';
import { selectIsQuickViewModalOpen } from '@/redux/slices/modals/selectors';

import { useLang } from '@/hooks/useLang';
import { addOverflowHiddenToBody } from '@/lib/utils/modals';

import { ISelectedSizes } from '@/redux/slices/sizeTable/types';

const ProductSizeTableBtn = ({ sizes, type, className }: ISelectedSizes) => {
	const dispatch = useAppDispatch();
	const IsQuickViewModalOpen = useSelector(selectIsQuickViewModalOpen);

	const { translations } = useLang();

	const handleShowSizeTable = () => {
		// setIsAddToFavorites(false);

		// Если модалка не в модалке быстрого просмотра
		if (!IsQuickViewModalOpen) {
			addOverflowHiddenToBody();
		}

		dispatch(setSizeTableSizes({ sizes, type }));
		dispatch(openSizeTableModal());
	};

	return (
		<button className={`${className}`} onClick={handleShowSizeTable}>
			{translations.product.size_table}
		</button>
	);
};

export default ProductSizeTableBtn;
