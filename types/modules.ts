// export interface IMenuProps {
// 	isMenuOpen: boolean;
// 	toggleOpenMenu: () => void;
// }

import { IProduct } from "./common";

export interface IAccordionProps {
	children: React.ReactNode;
	title: string | JSX.Element;
	titleClass: string;
	rotateIconClass?: string;
}

export interface IMenuLinkItemProps {
	item: {
		id: number;
		text: string;
		href: string;
	};
	handleRedirectToCatalog: (arg0: string) => void;
}

export interface ICatalogMenuButtonProps {
	name: string
	isActive: boolean
	handler: VoidFunction
}

export interface ISearchModal {
	handleCloseModal: VoidFunction
}

export interface IQuickViewModal {
	handleCloseModal: VoidFunction
}

export interface ISizeTableModal {
	handleCloseModal: VoidFunction
}

export interface IProductsListItemProps {
	item: IProduct
	title?: string
}

export interface IProductLabelProps {
	isNew: boolean
	isBestseller: boolean
}

export interface IProductColorProps {
	color: string
	className?: string
}