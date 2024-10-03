'use client'

import { Next13ProgressBar } from 'next13-progressbar'

import { Provider} from 'react-redux';
import { store } from '@/redux/store';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {

	return (
		<Provider store={store}>
			{/* // TODO получение с редакса <html lang={lang}> */}
			<html lang=''>
				<body>
					<Next13ProgressBar height='4px' color='#9466FF' showOnShallow />
					<div className="wrapper">
						{children}
					</div>
				</body>
			</html>
		</Provider>
	);
};

export default PagesLayout;