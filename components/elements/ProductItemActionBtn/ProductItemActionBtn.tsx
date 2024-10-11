import { AnimatePresence, motion } from 'framer-motion';

import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { basePropsForMotion } from '@/constants/motion';

import Tooltip from '../Tooltip/Tooltip';

// import styles from '@/styles/product-item-action-btn/index.module.scss';
import tooltipStyles from '@/components/elements/Tooltip/index.module.scss';

import { IProductItemActionBtnProps } from '@/types/elements';

const ProductItemActionBtn = ({
	text,
	callback,
	iconClass,
	marginBottom,
	spinner,
	withTooltip = true,
}: IProductItemActionBtnProps) => {
	const [open, setOpen] = useState(false);
	const [tooltipLeft, setTooltipLeft] = useState(0);

	const tooltipRef = useRef() as MutableRefObject<HTMLDivElement>;
	const showTooltip = () => setOpen(true);
	const hideTooltip = () => setOpen(false);

	useEffect(() => {
		if (open && withTooltip) {
			setTooltipLeft(tooltipRef.current.clientWidth);
		}
	}, [open, withTooltip]);

	return (
		<div
			// className={`${styles.actions}`}
			style={{ position: 'relative' }}
		>
			<button
				className={`${''} ${'' + iconClass}`}
				onClick={callback}
				onMouseEnter={showTooltip}
				onMouseLeave={hideTooltip}
				style={{ marginBottom: marginBottom || 16 }}
			>
				TOOLTIP
				{/* {spinner && <FontAwesomeIcon icon={faSpinner} spin color="#fff" />} */}
			</button>
			{withTooltip && (
				<AnimatePresence>
					{open && (
						<motion.div
							{...basePropsForMotion}
							className={tooltipStyles.tooltip}
							style={{ left: `-${tooltipLeft + 13}px` }}
							ref={tooltipRef}
						>
							<Tooltip text={text} />
						</motion.div>
					)}
				</AnimatePresence>
			)}
		</div>
	);
};

export default ProductItemActionBtn;
