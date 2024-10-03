'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { closeCatalogMenu } from '@/redux/slices/menu/slice';
import { selectIsCatalogOpen } from '@/redux/slices/menu/selectors';

import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { useMenuAnimation } from '@/hooks/UseMenuAnimation';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import Accordion from '../../Accordion';
import CatalogMenuList from './CatalogMenuList';
import CatalogMenuButton from './CatalogMenuButton';

const CatalogMenu = () => {
	const dispatch = useAppDispatch();
	const isCatalogOpen = useSelector(selectIsCatalogOpen);
	const { translations } = useLang();
	const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(2, isCatalogOpen);
	const isMedia450 = useMediaQuery(450);
	const [activeListId, setActiveListId] = useState<number | null>(null); // Добавил состояние для активного списка

	const handleCloseMenu = () => {
		dispatch(closeCatalogMenu());
		setActiveListId(null);
	};

	const isActiveList = (id: number) => activeListId === id;

	// TODO вынести отдельно и/или получать с сервера мб стоит в Menu также
	const items = [
		{
			name: translations.menu.catalog.categories[0].title, // Одежда / Cloth
			id: 1,
			items: [
				{
					title: translations.menu.catalog.categories[0].subcategories[0], // Футболки / T-shirts
					href: '/catalog/cloth?offset=0&type=t-shirts',
					handleCloseMenu,
				},
				{
					title: translations.menu.catalog.categories[0].subcategories[1], // Лонгсливы / Long-sleeves
					href: '/catalog/cloth?offset=0&type=long-sleeves',
					handleCloseMenu,
				},
				{
					title: translations.menu.catalog.categories[0].subcategories[2], // Худи / Hoodies
					href: '/catalog/cloth?offset=0&type=hoodie',
					handleCloseMenu,
				},
				{
					title: translations.menu.catalog.categories[0].subcategories[3], // Верхняя одежда / Outerwear
					href: '/catalog/cloth?offset=0&type=outerwear',
					handleCloseMenu,
				},
			],
			handler: () => setActiveListId(1),
		},
		{
			name: translations.menu.catalog.categories[1].title, // Аксессуары / Accessories
			id: 2,
			items: [
				{
					title: translations.menu.catalog.categories[1].subcategories[0], // Сумки / Bags
					href: '/catalog/accessories?offset=0&type=bags',
					handleCloseMenu,
				},
				{
					title: translations.menu.catalog.categories[1].subcategories[1], // Головные уборы / Headdress
					href: '/catalog/accessories?offset=0&type=headdress',
					handleCloseMenu,
				},
				{
					title: translations.menu.catalog.categories[1].subcategories[2], // Зонты / Umbrellas
					href: '/catalog/accessories?offset=0&type=umbrella',
					handleCloseMenu,
				},
			],
			handler: () => setActiveListId(2),
		},
		{
			name: translations.menu.catalog.categories[2].title, // Сувениры / Souvenirs
			id: 3,
			items: [
				{
					title: translations.menu.catalog.categories[2].subcategories[0], // Бизнес-сувениры / Business-souvenirs
					href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
					handleCloseMenu,
				},
				{
					title: translations.menu.catalog.categories[2].subcategories[1], // Промо-сувениры / Promotional-souvenirs
					href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
					handleCloseMenu,
				},
			],
			handler: () => setActiveListId(3),
		},
		{
			name: translations.menu.catalog.categories[3].title, // Канцтовары / Stationery
			id: 4,
			items: [
				{
					title: translations.menu.catalog.categories[3].subcategories[0], // Ручки / Pens
					href: '/catalog/office?offset=0&type=pen',
					handleCloseMenu,
				},
				{
					title: translations.menu.catalog.categories[3].subcategories[1], // Ноутбуки / Notebooks
					href: '/catalog/office?offset=0&type=notebook',
					handleCloseMenu,
				},
			],
			handler: () => setActiveListId(4),
		},
	];

	return (
		<div className="catalog-menu">
			<AnimatePresence>
				{isCatalogOpen && (
					<motion.aside
						initial={{ width: 0 }}
						animate={{ width: '100%' }}
						exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
						className="catalog-menu__aside"
					>
						<motion.div
							className="catalog-menu__inner"
							initial="closed"
							animate="open"
							exit="closed"
							variants={sideVariants}
						>
							<motion.button
								className="catalog-menu__close"
								variants={itemVariants}
								onClick={handleCloseMenu}
							>
								Close
							</motion.button>
							<motion.h2
								variants={itemVariants}
								className="catalog-menu__title"
							>
								{translations.menu.catalog.title}
							</motion.h2>
							<ul className="catalog-menu__list">
								{items.map(({ id, name, items, handler }) => {
									const isCurrentList = isActiveList(id);
									return (
										<motion.li
											key={id}
											variants={itemVariants}
											className="catalog-menu__list__item"
										>
											{!isMedia450 && (
												<>
													<CatalogMenuButton
														name={name}
														isActive={isCurrentList}
														handler={handler}
													/>
													<AnimatePresence>
														{isCurrentList && <CatalogMenuList items={items} />}
													</AnimatePresence>
												</>
											)}
											{isMedia450 && (
												<Accordion
													title={name}
													titleClass="btn-reset nav-menu__accordion__item__title"
												>
													<ul className="list-reset catalog__accordion__list">
														{items.map((item, i) => (
															<li
																key={i}
																className="catalog__accordion__list__item"
															>
																<Link
																	href={item.href}
																	className="nav-menu__accordion__item__list__item__link"
																	onClick={item.handleCloseMenu}
																>
																	{item.title}
																</Link>
															</li>
														))}
													</ul>
												</Accordion>
											)}
										</motion.li>
									);
								})}
							</ul>
						</motion.div>
					</motion.aside>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CatalogMenu;
