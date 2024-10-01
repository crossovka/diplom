'use client';

import Link from 'next/link';

// import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { toggleCatalogMenu, toggleMenu } from '@/redux/slices/menu/slice';
// import { selectIsCatalogOpen } from '@/redux/slices/menu/selectors';

import { useLang } from '@/hooks/useLang';

import CatalogMenu from '../Header/CatalogMenu/CatalogMenu';

export const MobileNavbar: React.FC = () => {
	const { translations } = useLang();

	const dispatch = useAppDispatch();
	// const isMenuOpen = useSelector(selectIsCatalogOpen)
	// const isCatalogOpen = useSelector(selectIsCatalogOpen)

	const handleToggleMenu = () => {
		dispatch(toggleMenu());
	};

	const handleToggleCatalog = () => {
		dispatch(toggleCatalogMenu());
	};

	return (
		<>
			<CatalogMenu />
			<div className="mobile-navbar">
				<Link href="/" className="mobile-navbar__btn --home">
					{translations.breadcrumbs.main}
				</Link>
				<button
					className="mobile-navbar__btn --catalog"
					onClick={handleToggleCatalog}
				>
					{translations.breadcrumbs.catalog}
				</button>
				<Link className="mobile-navbar__btn --favorites" href="/favorites">
					{/* {!!currentFavoritesByAuth.length && (
						<span className="not-empty not-empty-mobile-favorite" />
					)} */}
					{translations.breadcrumbs.favorites}
				</Link>
				<Link className="mobile-navbar__btn --cart" href="/cart">
					{/* {!!currentCartByAuth.length && (
						<span className="not-empty not-empty-mobile" />
					)} */}
					{translations.breadcrumbs.cart}
				</Link>
				<button className="mobile-navbar__btn --more" onClick={handleToggleMenu}>
					{translations.common.more}
				</button>
			</div>
		</>
	);
};
