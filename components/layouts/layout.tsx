'use client';

import { AnimatePresence } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
	selectIsQuickViewModalOpen,
	selectIsSearchModalOpen,
	selectIsSizeTableModalOpen,
} from '@/redux/slices/modals/selectors';
import { selectIsAuthModalOpen } from '@/redux/slices/auth/selectors';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
	closeAuthModalWhenSomeModalOpened,
	closeSizeTableByCheck,
	handleCloseQuickViewModal,
	handleCloseSearchModal,
} from '@/lib/utils/modals';

import { Header } from '../modules/Header/Header';
import { MobileNavbar } from '../modules/MobileNavbar/MobileNavbar';
import { Footer } from '../modules/Footer';

import SearchModal from '../modules/Header/SearchModal/SearchModal';
import QuickViewModal from '../modules/QuickViewModal/QuickViewModal';
import SizeTableModal from '../modules/SizeTableModal/SizeTableModal';
import AuthModal from '../modules/AuthModal/AuthModal';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();

	const isMedia991 = useMediaQuery(991);

	const IsSearchModalOpen = useAppSelector(selectIsSearchModalOpen);
	const IsQuickViewModalOpen = useAppSelector(selectIsQuickViewModalOpen);
	const IsSizeTableModalOpen = useAppSelector(selectIsSizeTableModalOpen);
	const IsAuthModalOpen = useAppSelector(selectIsAuthModalOpen);

	const handleCloseSizeTableModal = () => {
		closeSizeTableByCheck(dispatch, IsSizeTableModalOpen);
	};

	const closeAuth = () =>
		closeAuthModalWhenSomeModalOpened(
			dispatch,
			IsQuickViewModalOpen,
			IsSizeTableModalOpen
		);

	return (
		<>
			<Header />
			{children}
			{isMedia991 && <MobileNavbar />}
			{/* // TODO вынести в компонент Modals */}
			{/* // TODO зет индексы по всему проекту нормально расставить, чтобы потом не было конфликтов */}
			{/* <div className="modals"></div>
			<div className="modals-overlays">
				<ModalOverlay
				isOpen={IsSearchModalOpen}
				onClick={() => handleCloseSearchModal(dispatch)}
				type="search"
			/>
			</div> */}
			<AnimatePresence>
				{IsSearchModalOpen && (
					<SearchModal
						handleCloseModal={() => handleCloseSearchModal(dispatch)}
					/>
				)}
				{IsQuickViewModalOpen && (
					<QuickViewModal
						handleCloseModal={() => handleCloseQuickViewModal(dispatch)}
					/>
				)}
				{IsSizeTableModalOpen && (
					<SizeTableModal handleCloseModal={handleCloseSizeTableModal} />
				)}
				{IsAuthModalOpen && <AuthModal />}
			</AnimatePresence>
			<div
				className={`modal-overlay modal-overlay--search ${
					IsSearchModalOpen ? 'active' : ''
				}`}
				onClick={() => handleCloseSearchModal(dispatch)}
			/>
			<div
				className={`modal-overlay modal-overlay--quick-view ${
					IsQuickViewModalOpen ? 'active' : ''
				}`}
				onClick={() => handleCloseQuickViewModal(dispatch)}
			/>
			<div
				className={`modal-overlay modal-overlay--size-table ${
					IsSizeTableModalOpen ? 'active' : ''
				}`}
				onClick={handleCloseSizeTableModal}
			/>
			<div
				className={`modal-overlay modal-overlay--auth ${
					IsAuthModalOpen ? 'active' : ''
				}`}
				onClick={closeAuth}
			/>
			<Footer />
		</>
	);
};

export default RootLayout;
