import Link from 'next/link'

export const CartPopup: React.FC = () => {
	return (
		<Link
			href='/cart'
			className='header-controls__btn header-controls__btn--cart'
		>
		</Link>
	)
}