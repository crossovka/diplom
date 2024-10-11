'use client';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { setSizeTableSizes } from '@/redux/slices/sizeTable/slice';
import { openSizeTableModal } from '@/redux/slices/modals/slice';
import { selectIsSizeTableModalOpen } from '@/redux/slices/modals/selectors';

import { useLang } from '@/hooks/useLang';
import { addOverflowHiddenToHtml } from '@/lib/utils/common';

import { ISelectedSizes } from '@/redux/slices/sizeTable/types';

const ProductSizeTableBtn = ({ sizes, type, className }: ISelectedSizes) => {
	const dispatch = useAppDispatch();
	const IsSizeTableModalOpen = useSelector(selectIsSizeTableModalOpen);

	const { translations } = useLang();

	const handleShowSizeTable = () => {
		// setIsAddToFavorites(false);

		// Если модалка не в модалке быстрого просмотра
		if (!IsSizeTableModalOpen) {
			addOverflowHiddenToHtml();
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
