import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { forwardRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { useUserLogout } from '@/hooks/useLogout';
// import { useUserLogout } from '@/hooks/useLogout';
// import { useUserAvatar } from '@/hooks/useUserAvatar';

import { withClickOutside } from '@/components/hocs/withClickOutside';
import { IWrappedComponentProps } from '@/types/hocs';

const HeaderProfile = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const handleTogglePopup = () => setOpen(!open);
		const { translations } = useLang();
		const handleLogout = useUserLogout();
		return (
			<div className="header-profile" ref={ref}>
				{/* // TODO другой модификатор */}
				<button
					className=""
					// onClick={handleTogglePopup}
					onMouseEnter={handleTogglePopup}
				>
					{/* // src={src ? src : '/img/profile.svg'}
					// alt={alt ? alt : 'profile'} */}
					<Image src={'/img/chek.svg'} alt={''} width={28} height={28} />
				</button>
				<AnimatePresence>
					{open && (
						<motion.ul
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							className="header-profile__inner"
						>
							<li className="header-profile__arrow" />
							<li className="header-profile__item">
								<Link href="/profile">{translations.header.profile}</Link>
							</li>
							<li className="header-profile__item">
								<button onClick={handleLogout}>
									{translations.header.logout}
								</button>
							</li>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		);
	}
);

HeaderProfile.displayName = 'HeaderProfile';

export default withClickOutside(HeaderProfile);
