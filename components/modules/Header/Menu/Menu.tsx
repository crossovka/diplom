'use client';

// TODO разделить на компоненты- секции
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { useSelector } from 'react-redux';
import { selectIsMenuOpen } from '@/redux/slices/menu/selectors';

import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// import { IMenuProps } from '@/types/modules';

import Accordion from '../../Accordion';
import BuyersListItems from './BuyersListItems';
import ContactsListItems from './ContactsListItems';
import MenuLinkItem from './MenuLinkItem';

const Menu = () => {
	const [activeListId, setActiveListId] = useState(0);
	const { translations } = useLang();
	const pathname = usePathname();
	const isMedia991 = useMediaQuery(991);
	const isMedia640 = useMediaQuery(640);

	const isMenuOpen = useSelector(selectIsMenuOpen);

	const handleShowCatalogList = () => setActiveListId(1);
	const handleShowBuyersList = () => setActiveListId(2);
	const handleShowContactsList = () => setActiveListId(3);

	const handleCloseMenu = () => {
		// TODO закрытие меню в пропс передать
		setActiveListId(0);
	};

	const handleRedirectToCatalog = (path: string) => {
		if (pathname.includes('/catalog')) {
			window.history.pushState({ path }, '', path);
			window.location.reload();
		}
		handleCloseMenu();
	};

	// TODO вынести отдельно и/или получать с сервера мб стоит в CatalogMenu также
	const clothLinks = [
		{
			id: 1,
			text: translations.comparison['t-shirts'],
			href: '/catalog/cloth?offset=0&type=t-shirts',
		},
		{
			id: 2,
			text: translations.comparison['long-sleeves'],
			href: '/catalog/cloth?offset=0&type=long-sleeves',
		},
		{
			id: 3,
			text: translations.comparison.hoodie,
			href: '/catalog/cloth?offset=0&type=hoodie',
		},
		{
			id: 4,
			text: translations.comparison.outerwear,
			href: '/catalog/cloth?offset=0&type=outerwear',
		},
	];

	const accessoriesLinks = [
		{
			id: 1,
			text: translations.comparison.bags,
			href: '/catalog/accessories?offset=0&type=bags',
		},
		{
			id: 2,
			text: translations.comparison.headdress,
			href: '/catalog/accessories?offset=0&type=headdress',
		},
		{
			id: 3,
			text: translations.comparison.umbrella,
			href: '/catalog/accessories?offset=0&type=umbrella',
		},
	];

	const souvenirsLinks = [
		{
			id: 1,
			text: translations.comparison['business-souvenirs'],
			href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
		},
		{
			id: 2,
			text: translations.comparison['promotional-souvenirs'],
			href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
		},
	];

	const officeLinks = [
		{
			id: 1,
			text: translations.comparison.notebook,
			href: '/catalog/office?offset=0&type=notebook',
		},
		{
			id: 2,
			text: translations.comparison.pen,
			href: '/catalog/office?offset=0&type=pen',
		},
	];

	return (
		<nav className={`nav-menu ${isMenuOpen ? 'open' : 'close'}`}>
			<div className="container nav-menu__container">
				<ul className={`nav-menu__list ${isMenuOpen ? 'open' : ''}`}>
					{/* Catalog section */}
					{!isMedia991 && (
						<li className="nav-menu__list__item">
							<button
								className="nav-menu__list__item__btn"
								onMouseEnter={handleShowCatalogList}
							>
								{translations.menu.catalog.title}
							</button>
							<AnimatePresence>
								{activeListId === 1 && (
									<motion.ul
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="nav-menu__accordion"
									>
										<li className="nav-menu__accordion__item">
											<Accordion
												title={translations.menu.catalog.categories[0].title}
												titleClass="nav-menu__accordion__item__title"
											>
												<ul className="nav-menu__accordion__item__list">
													{clothLinks.map((item) => (
														<MenuLinkItem
															key={item.id}
															item={item}
															handleRedirectToCatalog={handleRedirectToCatalog}
														/>
													))}
												</ul>
											</Accordion>
										</li>
										<li className="nav-menu__accordion__item">
											<Accordion
												title={translations.menu.catalog.categories[1].title}
												titleClass="nav-menu__accordion__item__title"
											>
												<ul className="nav-menu__accordion__item__list">
													{accessoriesLinks.map((item) => (
														<MenuLinkItem
															key={item.id}
															item={item}
															handleRedirectToCatalog={handleRedirectToCatalog}
														/>
													))}
												</ul>
											</Accordion>
										</li>
										<li className="nav-menu__accordion__item">
											<Accordion
												title={translations.menu.catalog.categories[2].title}
												titleClass="nav-menu__accordion__item__title"
											>
												<ul className="nav-menu__accordion__item__list">
													{souvenirsLinks.map((item) => (
														<MenuLinkItem
															key={item.id}
															item={item}
															handleRedirectToCatalog={handleRedirectToCatalog}
														/>
													))}
												</ul>
											</Accordion>
										</li>
										<li className="nav-menu__accordion__item">
											<Accordion
												title={translations.menu.catalog.categories[3].title}
												titleClass="nav-menu__accordion__item__title"
											>
												<ul className="nav-menu__accordion__item__list">
													{officeLinks.map((item) => (
														<MenuLinkItem
															key={item.id}
															item={item}
															handleRedirectToCatalog={handleRedirectToCatalog}
														/>
													))}
												</ul>
											</Accordion>
										</li>
									</motion.ul>
								)}
							</AnimatePresence>
						</li>
					)}

					{/* Buyers section */}
					<li className="nav-menu__list__item">
						{!isMedia640 && (
							<button
								className="nav-menu__list__item__btn"
								onMouseEnter={handleShowBuyersList}
							>
								{translations.menu.buyers.title}
							</button>
						)}
						{!isMedia640 && (
							<AnimatePresence>
								{activeListId === 2 && (
									<motion.ul
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="nav-menu__accordion"
									>
										<BuyersListItems />
									</motion.ul>
								)}
							</AnimatePresence>
						)}
						{isMedia640 && (
							<Accordion
								title={translations.menu.buyers.title}
								titleClass="nav-menu__list__item__btn"
							>
								<ul className="nav-menu__accordion__item__list">
									<BuyersListItems />
								</ul>
							</Accordion>
						)}
					</li>

					{/* Contacts section */}
					<li className="nav-menu__list__item">
						{!isMedia640 && (
							<button
								className="nav-menu__list__item__btn"
								onMouseEnter={handleShowContactsList}
							>
								{translations.menu.contacts.title}
							</button>
						)}
						{!isMedia640 && (
							<AnimatePresence>
								{activeListId === 3 && (
									<motion.ul
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="nav-menu__accordion"
									>
										<ContactsListItems />
									</motion.ul>
								)}
							</AnimatePresence>
						)}
						{isMedia640 && (
							<Accordion
								title={translations.menu.contacts.title}
								titleClass="nav-menu__list__item__btn"
							>
								<ul className="nav-menu__accordion__item__list">
									<ContactsListItems />
								</ul>
							</Accordion>
						)}
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Menu;
