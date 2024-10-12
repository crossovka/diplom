'use client'

// import Link from 'next/link';
import { motion } from 'framer-motion';

import { useLang } from '@/hooks/useLang';
// import { useState, useTransition } from 'react';
// import { useDebounceCallback } from '@/hooks/useDebounceCallback';

import { basePropsForMotion } from '@/constants/motion'

import { ISearchModal } from '@/types/modules';

const SearchModal = ({ handleCloseModal } : ISearchModal) => {
	const { translations } = useLang();
	// const [, setSearchValue] = useState('');
	// const [, startTransition] = useTransition();
	// const delayCallback = useDebounceCallback(1000);

	const handleInputFocus = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
	) => {
		e.target.classList.add('with_value');
	};

	const handleInputBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
	) => {
		if (e.target.value) {
			return;
		}

		e.target.classList.remove('with_value');
	};

	return (
		// TODO для всех модалок атрибуты для доступности прописать
		<motion.div {...basePropsForMotion} className='modal search-modal'>
			<button
				className="search-modal__close"
				// aria-label={translations.header.close}
				// TODO Чёт типа того для кнопок, где картинка просто на фоне
				onClick={handleCloseModal}
			/>
			<h3 className="search-modal__title">
				{translations.header.search_products}
			</h3>
			<div className="search-modal__top">
				<label className="search-modal__label">
					<input
						type="text"
						className="search-modal__input"
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						// onChange={handleSearchInputChange}
					/>
					<span className="search-modal__floating-label">
						{translations.header.search_infos}
					</span>
				</label>
			</div>
		</motion.div>
	);
};

export default SearchModal;
