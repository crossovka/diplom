'use client';

import { Next13ProgressBar } from 'next13-progressbar';
import { EarthoOneProvider } from '@eartho/one-client-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

import { useState, useEffect } from 'react';
import { isUserAuth } from '@/lib/utils/auth';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	// const [cookieAlertOpen, setCookieAlertOpen] = useState(false);

	// const protectedRoutes = ['/profile'];
	// const router = useRouter();
	// const pathname = usePathname();

	// useEffect(() => {
	// 	if (protectedRoutes.includes(pathname)) {
	// 		if (!isUserAuth()) {
	// 			// setShouldShowContent(false)
	// 			router.push('/');
	// 			return;
	// 		}

	// 		handleLoadProtectedRoute();
	// 		return;
	// 	}

	// 	// setShouldShowContent(true)
	// }, [pathname]);

	// const handleLoadProtectedRoute = async () => {
	// 	const auth = JSON.parse(localStorage.getItem('auth') as string);

	// 	// await loginCheckFx{ jwt: auth.accessToken });

	// 	// setShouldShowContent(true);
	// };

	return (
		<Provider store={store}>
			<html lang="ru">
				<body className="body">
					<Next13ProgressBar height="4px" color="#9466FF" showOnShallow />
					<div className="wrapper">{children}</div>
					{/* !reverseOrder means уведомления будут появляться снизу. */}
					<Toaster position="top-center" reverseOrder={false} />
				</body>
			</html>
		</Provider>
	);
};

export default PagesLayout;
