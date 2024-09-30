import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

interface IAccordionProps {
	children: React.ReactNode;
	title: string | JSX.Element;
	titleClass: string;
	className: string;
	iconClass?: string;
}


/**
 * The Accordion component is a self-contained piece of UI that can be used to hide/show content.
 *
 * The component takes 3 props:
 * - `children`: The content of the accordion that will be hidden or shown.
 * - `title`: The title of the accordion that will be used to render the button.
 * - `titleClass`: The CSS class to be applied to the button.
 * - `className`: The CSS class to be applied to the outermost div of the component.
 * - `rotateIconClass`: The CSS class to be applied to the icon when the accordion is rotated.
 *
 * The component renders a button with the given title and a chevron icon.
 * When the button is clicked, the component will render the content of the accordion,
 * and the icon will be rotated.
 *
 * @param {{ children: React.ReactNode; title: string | JSX.Element; titleClass: string; className: string; rotateIconClass?: string }} props
 * @returns {JSX.Element}
 */
const Accordion: React.FC<IAccordionProps> = ({ children, title, titleClass, iconClass, className }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleAccordion = () => setExpanded(!expanded);

	return (
		<div className={`accordion ${className || ''}`}>
			<motion.button
				initial={false}
				onClick={toggleAccordion}
				className={`accordion__title ${titleClass}`}
			>
				{title}
				<span className={`accordion__icon ${iconClass || ''} ${expanded ? 'accordion__icon--rotate' : ''}`}>
					&#9660;
				</span>
			</motion.button>
			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						className='accordion__content'
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						style={{ overflow: 'hidden' }}
						transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Accordion;