import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';

import { withClickOutside } from '@/components/hocs/withClickOutside';
import { IWrappedComponentProps } from '@/types/hocs';

import { useLang } from '@/hooks/useLang';

import { formatPrice } from '@/lib/utils/common';

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const handleShowPopup = () => setOpen(true);
		const handleHidePopup = () => setOpen(false);

		const { translations } = useLang();
		// const { animatedPrice } = useTotalPrice()

		const spinner = false;

		return (
			<div className="cart-popup" ref={ref}>
				{/* // TODO когда на тачскрине то сама кнопка не перенаправляет потом же в корзину */}
				<Link
					href="/cart"
					className="header-controls__btn header-controls__btn--cart"
					onMouseEnter={handleShowPopup}
				>
					{/* {!!currentCartByAuth.length && <span className='not-empty' /> */}
				</Link>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							className="cart-popup__wrapper"
							onMouseLeave={handleHidePopup}
						>
							<span className="cart-popup__arrow" />
							<button className="cart-popup__close" onClick={handleHidePopup} />
							<h6 className="cart-popup__title">
								{translations.breadcrumbs.cart}
							</h6>
							{spinner ? (
								<div className="cart-popup__spinner">
									{/* <FontAwesomeIcon
										icon={faSpinner}
										spin
										color="#fff"
										size="3x"
									/> */}
								</div>
							) : (
								<ul className="cart-popup__cart-list">
									<AnimatePresence>
										{/* {currentCartByAuth.length ? (
										currentCartByAuth.map((item) => (
											<motion.li
												key={item._id || item.clientId}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												className='cart-list__item'
											>
												<CartPopupItem item={item} />
											</motion.li>
										))
									)
									: (
										<li className='cart-popup__cart-list__empty-cart' />
											)} */}
										<li className="cart-popup__cart-list__empty-cart" />
									</AnimatePresence>
								</ul>
							)}
							<div className="cart-popup__footer">
								<div className="cart-popup__footer__inner">
									<span>{translations.common.order_price}:</span>
									{/* <span>{formatPrice(animatedPrice)} ₽</span> */}
									<span>{formatPrice(0)} ₽</span>
								</div>
								<Link href="/order" className="cart-popup__footer__link">
									{translations.breadcrumbs.order}
								</Link>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	}
);

CartPopup.displayName = 'CartPopup';

export default withClickOutside(CartPopup);
