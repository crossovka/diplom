'use client';

import { AnimatePresence } from 'framer-motion';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { closeQuickViewModal, closeSearchModal, closeSizeTableModal } from '@/redux/slices/modals/slice';
import {
	selectIsQuickViewModalOpen,
	selectIsSearchModalOpen,
	selectIsSizeTableModalOpen,
} from '@/redux/slices/modals/selectors';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { Header } from '../modules/Header/Header';
import { MobileNavbar } from '../modules/MobileNavbar/MobileNavbar';
import { Footer } from '../modules/Footer';

import SearchModal from '../modules/Header/SearchModal/SearchModal';
import QuickViewModal from '../modules/QuickViewModal/QuickViewModal';
import SizeTable from '../modules/SizeTable/SizeTable';
import { closeSizeTableByCheck, removeOverflowHiddenFromHtml } from '@/lib/utils/common';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();

	const isMedia991 = useMediaQuery(991);

	const IsSearchModalOpen = useSelector(selectIsSearchModalOpen);
	const IsQuickViewModalOpen = useSelector(selectIsQuickViewModalOpen);
	const IsSizeTableModalOpen = useSelector(selectIsSizeTableModalOpen);

	const handleCloseSearchModal = () => {
		removeOverflowHiddenFromHtml()
		dispatch(closeSearchModal());
	};

	const handleCloseQuickViewModal = () => {
		removeOverflowHiddenFromHtml()
		dispatch(closeQuickViewModal());
	}

	const handleCloseSizeTableModal = () => {
		closeSizeTableByCheck(dispatch, IsSizeTableModalOpen);
	};

	return (
		<>
			<Header />
			{children}
			{isMedia991 && <MobileNavbar />}
			{/* // TODO вынести в компонент Modals */}
			{/* // TODO зет индексы по всему проекту нормально расставить, чтобы потом не было конфликтов */}
			<AnimatePresence>
				{IsSearchModalOpen && (
					<SearchModal handleCloseModal={handleCloseSearchModal} />
				)}
				{IsQuickViewModalOpen && <QuickViewModal handleCloseModal={handleCloseQuickViewModal} />}
				{IsSizeTableModalOpen && <SizeTable handleCloseModal={handleCloseSizeTableModal} />}
			</AnimatePresence>
			<div
				className={`modal-overlay modal-overlay--search ${
					IsSearchModalOpen ? 'active' : ''
				}`}
				onClick={handleCloseSearchModal}
			/>
			<div
				className={`modal-overlay modal-overlay--quick-view ${
					IsQuickViewModalOpen ? 'active' : ''
				}`}
				onClick={handleCloseQuickViewModal}
			/>
			<div
				className={`modal-overlay modal-overlay--size-table ${
					IsSizeTableModalOpen ? 'active' : ''
				}`}
				onClick={handleCloseSizeTableModal}
			/>
			<Footer />
		</>
	);
};

export default RootLayout;