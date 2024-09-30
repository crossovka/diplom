import Link from 'next/link';
import React from 'react';

interface IMenuLinkItemProps {
	item: {
		id: number;
		text: string;
		href: string;
	};
	handleRedirectToCatalog: (arg0: string) => void;
}

const MenuLinkItem = ({
	item,
	handleRedirectToCatalog,
}: IMenuLinkItemProps) => {
	const onRedirect = () => handleRedirectToCatalog(item.href);

	return (
		<li key={item.id} className="">
			<Link
				href={item.href}
				className=""
				onClick={onRedirect}
			>
				{item.text}
			</Link>
		</li>
	);
};

export default MenuLinkItem;
