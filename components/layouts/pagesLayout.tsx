'use client'

import { Next13ProgressBar } from 'next13-progressbar'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {

	return (
		// TODO получение с редакса <html lang={lang}>
		<html lang=''>
			<body>
				<Next13ProgressBar height='4px' color='#9466FF' showOnShallow />
				<div className="wrapper">
					{children}
				</div>
			</body>
		</html>
	);
};

export default PagesLayout;