import Link from 'next/link';
import { useLang } from '@/hooks/useLang';

const BuyersListItems = () => {
	const { translations } = useLang();

	return (
		<>
			<li className="nav-menu__accordion__item">
				<Link
					href="/about"
					className="nav-menu__accordion__item__link nav-menu__accordion__item__title"
				>
					{translations.menu.buyers.title}
				</Link>
			</li>
			<li className="nav-menu__accordion__item">
				<Link href="/blog" className="nav-menu__accordion__item__link">
					{translations.menu.buyers.blog}
				</Link>
			</li>
			<li className="nav-menu__accordion__item">
				<Link
					href="/shipping-and-payment"
					className="nav-menu__accordion__item__link"
				>
					{translations.menu.buyers.shipping}
				</Link>
			</li>
			<li className="nav-menu__accordion__item">
				<Link
					href="/purchase-returns"
					className="nav-menu__accordion__item__link"
				>
					{translations.menu.buyers.returns}
				</Link>
			</li>
		</>
	);
};

export default BuyersListItems;
