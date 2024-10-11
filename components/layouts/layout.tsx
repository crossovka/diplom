'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { closeSearchModal } from '@/redux/slices/modals/slice';
import {
	selectIsQuickViewModalOpen,
	selectIsSearchModalOpen,
} from '@/redux/slices/modals/selectors';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { basePropsForMotion } from '@/constants/motion';

import { Header } from '../modules/Header/Header';
import { MobileNavbar } from '../modules/MobileNavbar/MobileNavbar';
import { Footer } from '../modules/Footer';

import SearchModal from '../modules/Header/SearchModal/SearchModal';
import QuickViewModal from '../modules/QuickViewModal/QuickViewModal';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();

	const isMedia991 = useMediaQuery(991);

	const IsSearchModalOpen = useSelector(selectIsSearchModalOpen);
	const IsQuickViewModalOpen = useSelector(selectIsQuickViewModalOpen);

	const handleCloseSearchModal = () => {
		// removeOverflowHiddenFromHtml()
		dispatch(closeSearchModal());
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
					<SearchModal handleCloseSearchModal={handleCloseSearchModal} />
				)}
			</AnimatePresence>
			<div
				className={`search-overlay ${
					IsSearchModalOpen ? 'search-overlay--active' : ''
				}`}
				onClick={handleCloseSearchModal}
			/>
			<AnimatePresence>
				{IsQuickViewModalOpen && (
					<motion.div
						{...basePropsForMotion}
						// initial={{ opacity: 0, zIndex: 6 }}
					>
						<QuickViewModal />
					</motion.div>
				)}
			</AnimatePresence>
			<Footer />
		</>
	);
};

export default RootLayout;
