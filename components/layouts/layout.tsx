'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { Header } from '../modules/Header/Header';
import { MobileNavbar } from '../modules/MobileNavbar/MobileNavbar';
import { Footer } from '../modules/Footer';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const isMedia991 = useMediaQuery(991);

	return (
		<>
			<Provider store={store}>
				<Header />
				{children}
				{isMedia991 && <MobileNavbar />}
				<Footer />
			</Provider>
		</>
	);
};

export default RootLayout;
