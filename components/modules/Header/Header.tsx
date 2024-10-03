'use client';

import Link from 'next/link';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';

import { setLang } from '@/redux/slices/lang/slice';
import { selectLang } from '@/redux/slices/lang/selectors';
import { AllowedLangs } from '@/redux/slices/lang/types';

import { closeCatalogMenu, toggleMenu } from '@/redux/slices/menu/slice';
import { selectIsMenuOpen, selectIsCatalogOpen } from '@/redux/slices/menu/selectors';

import { openSearchModal } from '@/redux/slices/modals/slice';

// import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// import { CartPopup } from './CartPopup/CartPopup';
// import { HeaderProfile } from './HeaderProfile';
import Menu from './Menu/Menu';

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();

	const currentLang = useSelector(selectLang);
	const isMenuOpen = useSelector(selectIsMenuOpen);
	const isCatalogOpen = useSelector(selectIsCatalogOpen);

	const handleToggleMenu = () => {
		dispatch(toggleMenu());
		dispatch(closeCatalogMenu()); // Закрываем каталог при открытии меню
	};

	const { lang, translations } = useLang();

	const isMedia991 = useMediaQuery(991);
	// const isAuth = true;

	// TODO : save to local storage и проверку эту тоже надо нет для сред где нет local storage?
	const toggleLang = () => {
		if (typeof window === 'undefined') return;
		const newLang = lang === AllowedLangs.EN ? AllowedLangs.RU : AllowedLangs.EN;
		dispatch(setLang(newLang));
		localStorage.setItem('lang', JSON.stringify(newLang));
	};

	const handleOpenSearchModal = () => {
		dispatch(openSearchModal());
		// addOverflowHiddenToBody()
	};

	return (
		<header
		// TODO нормально что после шаблонной строки 2 пробела?
		// header  
			className={`header ${isMenuOpen ? 'header--menu-open' : ''} ${isCatalogOpen ? 'header--catalog-open' : ''}`}
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
							onClick={handleOpenSearchModal}
						/>
					</li>
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
							{/* <li className="header-controls__item">
								<CartPopup />
							</li> */}
						</>
					)}
					{/* <li className="header-controls__item header-controls__item--profile">
						{isAuth && <HeaderProfile />}
					</li> */}
				</ul>
			</div>
			<Menu />
		</header>
	);
};
