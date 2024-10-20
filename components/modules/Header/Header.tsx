'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '@/redux/store';

import { setLang } from '@/redux/slices/lang/slice';
import { selectLang } from '@/redux/slices/lang/selectors';
import { AllowedLangs } from '@/redux/slices/lang/types';

import { closeCatalogMenu, toggleMenu } from '@/redux/slices/menu/slice';
import {
	selectIsMenuOpen,
	selectIsCatalogOpen,
} from '@/redux/slices/menu/selectors';

import { selectIsAuth } from '@/redux/slices/auth/selectors';
import {
	selectUserLoginCheckLoading,
} from '@/redux/slices/user/selectors';

import { useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { handleOpenSearchModal, handleOpenAuthModal } from '@/lib/utils/modals';
import { triggerLoginCheck } from '@/lib/utils/auth';

import CartPopup from './CartPopup/CartPopup';
import HeaderProfile from './HeaderProfile';
import Menu from './Menu/Menu';

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();

	const { lang, translations } = useLang();
	const isMedia991 = useMediaQuery(991);

	const currentLang = useAppSelector(selectLang);
	const isMenuOpen = useAppSelector(selectIsMenuOpen);
	const isCatalogOpen = useAppSelector(selectIsCatalogOpen);
	const isAuth = useAppSelector(selectIsAuth);
	const isLoadingCheckLoading = useAppSelector(selectUserLoginCheckLoading);

	const handleToggleMenu = () => {
		dispatch(toggleMenu());
		dispatch(closeCatalogMenu()); // Закрываем каталог при открытии меню
	};

	// TODO : save to local storage и проверку эту тоже надо нет для сред где нет local storage?
	const toggleLang = () => {
		if (typeof window === 'undefined') return;

		const newLang = lang === AllowedLangs.EN ? AllowedLangs.RU : AllowedLangs.EN;
		dispatch(setLang(newLang));
		localStorage.setItem('lang', JSON.stringify(newLang));
	};

	useEffect(() => {
		const auth = JSON.parse(localStorage.getItem('auth') as string);
		// const cart = JSON.parse(localStorage.getItem('cart') as string);
		// const favoritesFromLS = JSON.parse(
		// 	localStorage.getItem('favorites') as string
		// );
		// const comparisonFromLS = JSON.parse(
		// 	localStorage.getItem('comparison') as string
		// );

		triggerLoginCheck(dispatch);

		if (auth?.accessToken) {
			return;
		}
	}, []);

	useEffect(() => {
		if (isAuth) {
			const auth = JSON.parse(localStorage.getItem('auth') as string);

			// if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
			//   addProductsFromLSToFavorites({
			//     jwt: auth.accessToken,
			//     favoriteItems: favoritesFromLS,
			//   })
			// }

			// if (comparisonFromLS && Array.isArray(comparisonFromLS)) {
			//   addProductsFromLSToComparison({
			//     jwt: auth.accessToken,
			//     comparisonItems: comparisonFromLS,
			//   })
			// }
		}
	}, [isAuth]);

	return (
		<header
			// TODO нормально что после шаблонной строки 2 пробела?
			// header__
			className={`header ${isMenuOpen ? 'header--menu-open' : ''} ${
				isCatalogOpen ? 'header--catalog-open' : ''
			}`}
		>
			<div className="container header__container">
				{!isMedia991 && (
					<button className="header__burger" onClick={handleToggleMenu}>
						{translations.header.menu_btn}
					</button>
				)}

				<Link className="header__logo" href="/">
					<h1>{translations.header.logo}</h1>
				</Link>

				<ul className="header__controls header-controls">
					<li className="header-controls__item">
						<button className="header-controls__lang" onClick={toggleLang}>
							{currentLang}
						</button>
					</li>
					<li className="header-controls__item">
						<button
							// TODO aria-label потому что картинок нет нужно добавить будет для таких кнопок ?
							className="header-controls__btn header-controls__btn--search"
							onClick={() => handleOpenSearchModal(dispatch)}
						/>
					</li>
					{/* Будет внутри MobileNavbar */}
					{!isMedia991 && (
						<>
							<li className="header-controls__item">
								<Link
									href="/favorites"
									className="header-controls__btn header-controls__btn--favorites"
								/>
							</li>
							<li className="header-controls__item">
								<Link
									href="/compare"
									className="header-controls__btn header-controls__btn--compare"
								/>
							</li>
							<li className="header-controls__item">
								<CartPopup />
							</li>
						</>
					)}
					<li className="header-controls__item">
						{isAuth ? (
							<HeaderProfile />
						) : // TODO isLoginCheckLoading?
						isLoadingCheckLoading ? (
							<FontAwesomeIcon icon={faSpinner} spin />
						) : (
							<button
								className="header-controls__btn header-controls__btn--profile"
								onClick={() => handleOpenAuthModal(dispatch)}
							/>
						)}
					</li>
				</ul>
			</div>
			<Menu />
		</header>
	);
};
