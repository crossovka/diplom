'use client'

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { Header, MobileNavbar, Footer } from "../modules";

const RootLayout = ({ children }: { children: React.ReactNode; }) => {
	const isMedia800 = useMediaQuery(800)

	return (
		<>
			<Provider store={store}>
				<Header />
				{children}
				{isMedia800 && <MobileNavbar />}
				<Footer />
			</Provider>
		</>
	);
}

export default RootLayout;