'use client'

import Link from 'next/link'

import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { setLang } from '@/redux/slices/lang/slice';
import { selectLang } from '@/redux/slices/lang/selectors';
import { AllowedLangs } from '@/redux/slices/lang/types';

import { useLang } from '@/hooks/useLang';

import { Drawer } from './Drawer';
import { CartPopup } from './CartPopup/CartPopup';
import { HeaderProfile } from './HeaderProfile';

export const Header: React.FC = () => {
	const { lang, translations } = useLang();
	const dispatch = useAppDispatch();

	const isAuth = true;

	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleOpenMenu = () => {
		setMenuOpen(!isMenuOpen); // Переключаем состояние меню
	};

	const currentLang = useSelector(selectLang);

	const toggleLang = () => {
		const newLang = lang === AllowedLangs.EN ? AllowedLangs.RU : AllowedLangs.EN;
		dispatch(setLang(newLang));
		// TODO : save to local storage
		localStorage.setItem('lang', JSON.stringify(lang))
	};

	
	const handleOpenSearchModal = () => {
		console.log('handleOpenSearchModal');
    // openSearchModal()
    // addOverflowHiddenToBody()
  }

	return (
		<header className="header">
			<div className="container header__container">
				<button className="header__burger" onClick={toggleOpenMenu}>
					{translations.header.menu_btn}
				</button>

				<Link className="header__logo" href="/">
					<h1>{translations.header.logo}</h1>
				</Link>

				<ul className='header__controls header-controls'>
					<li className='header-controls__item'>
						<button
							className='header-controls__lang'
							onClick={toggleLang}
						>
						{currentLang}
						</button>
					</li>
					<li className='header-controls__item'>
						<button
							// TODO aria-label потому что картинок нет нужно добавить будет
							className='header-controls__btn header-controls__btn--search'
							onClick={handleOpenSearchModal}
						/>
					</li>
					<li className='header-controls__item'>
						<Link
							href='/favorites'
							className='header-controls__btn header-controls__btn--favorites'
						/>
					</li>
					<li className='header-controls__item'>
						<Link
							href='/compare'
							className='header-controls__btn header-controls__btn--compare'
						/>
					</li>
					<li className='header-controls__item'>
						<CartPopup />
					</li>
					<li className='header-controls__item header-controls__item--profile'>
						{isAuth && <HeaderProfile /> }
					</li>
				</ul>
			</div>
			<Drawer isOpen={isMenuOpen} toggleOpenMenu={toggleOpenMenu} />
		</header>
	);
};