'use client';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { closeSearchModal } from '@/redux/slices/modals/slice';
import { selectIsSearchModalOpen } from '@/redux/slices/modals/selectors';

import { AnimatePresence } from 'framer-motion';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { Header } from '../modules/Header/Header';
import { MobileNavbar } from '../modules/MobileNavbar/MobileNavbar';
import { Footer } from '../modules/Footer';

import SearchModal from '../modules/Header/SearchModal/SearchModal';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();

	const isMedia991 = useMediaQuery(991);

	const IsSearchModalOpen = useSelector(selectIsSearchModalOpen);
	const handleCloseSearchModal = () => {
		// removeOverflowHiddenFromBody()
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
				<SearchModal handleCloseSearchModal={handleCloseSearchModal}  />
			)}
			</AnimatePresence>
			<div
				className={`search-overlay ${
					IsSearchModalOpen ? 'search-overlay--active' : ''
				}`}
				onClick={handleCloseSearchModal}
			/>
			<Footer />
		</>
	);
};

export default RootLayout;

