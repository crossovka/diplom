import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MenuLinkItem from './MenuLinkItem';
import Accordion from '../../Accordion';

interface Subcategory {
	title: string;
	path: string;
}

interface Category {
	title: string;
	subcategories: Subcategory[];
}

interface DrawerProps {
	isOpen: boolean;
	toggleOpenMenu: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleOpenMenu }) => {
	const { translations } = useLang();
	const isMedia800 = useMediaQuery(800);

	const renderCategoryItems = (categories: Category[]) =>
		categories.map((category) => (
			<Accordion
				className="drawer-accordion_sub-accordion"
				key={category.title}
				title={category.title}
				titleClass=""
				iconClass="drawer__accordion-icon"
			>
				<ul className="drawer__accordion-list">
					{category.subcategories.map((subcategory) => (
						<MenuLinkItem
							key={subcategory.title}
							item={{
								id: subcategory.title,
								text: subcategory.title,
								href: subcategory.path,
							}}
							handleRedirectToCatalog={toggleOpenMenu}
						/>
					))}
				</ul>
			</Accordion>
		));

	return (
		<nav className={`drawer ${isOpen ? 'drawer--open' : 'drawer--closed'}`}>
			<div className="container drawer__container">
				<AnimatePresence>
					<motion.ul
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<ul className="drawer__list">
							{/* Catalog Section */}
							{!isMedia800 && (
								<li className="drawer__item">
									<Accordion
										title={translations.drawer.catalog.title}
										className="drawer__accordion drawer-accordion"
										titleClass="drawer__accordion-title"
										iconClass="drawer__accordion-icon"
									>
										{renderCategoryItems(
											translations.drawer.catalog.categories
										)}
									</Accordion>
								</li>
							)}

							{/* For Customers Section */}
							<li className="drawer__item">
								<Accordion
									title={translations.drawer.forCustomers.title}
									className="drawer__accordion drawer-accordion"
									titleClass="drawer__accordion-title"
									iconClass="drawer__accordion-icon"
								>
									<ul className="drawer__accordion-list">
										{translations.drawer.forCustomers.items.map((item) => (
											<MenuLinkItem
												key={item.title}
												item={{
													id: item.title,
													text: item.title,
													href: item.path,
												}}
												handleRedirectToCatalog={toggleOpenMenu}
											/>
										))}
									</ul>
								</Accordion>
							</li>
						</ul>
					</motion.ul>
				</AnimatePresence>
			</div>
		</nav>
	);
};