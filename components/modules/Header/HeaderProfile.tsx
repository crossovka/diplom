import Link from 'next/link';

export const HeaderProfile = () => {
	return (
		<Link
			href="/cart"
			className="header-controls__btn header-controls__btn--profile"
		/>
	);
};
