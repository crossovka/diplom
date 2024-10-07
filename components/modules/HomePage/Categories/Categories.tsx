'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useLang } from '@/hooks/useLang';
import useImagePreloader from '@/hooks/useImagePreloader';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import AllLink from '@/components/elements/AllLink';

import img1 from '@/public/img/categories/img_1.png';

import './Categories.scss';

const Categories: React.FC = () => {
	const { translations } = useLang();
	const { handleLoadingImageComplete, loadingImageClass } = useImagePreloader();
	const isMedia600 = useMediaQuery(600);

	// TODO получать также нормально с бэка
	const images = [
		{
			href: '/catalog/cloth',
			src: img1,
			alt: translations.menu.catalog.categories[0].title,
			title: translations.menu.catalog.categories[0].title,
		},
		{
			href: '/catalog/accessories',
			src: img1,
			alt: translations.menu.catalog.categories[1].title,
			title: translations.menu.catalog.categories[1].title,
		},
		{
			href: '/catalog/souvenirs',
			src: img1,
			alt: translations.menu.catalog.categories[2].title,
			title: translations.menu.catalog.categories[2].title,
		},
		{
			href: '/catalog/office',
			src: img1,
			alt: translations.menu.catalog.categories[3].title,
			title: translations.menu.catalog.categories[3].title,
		},
	];

	console.log(loadingImageClass)
	return (
		<section className="categories">
			<div className="categories__container">
				<div className="heading heading--with-link">
					<h2 className="heading__title h2">
						{translations.homePage.categories.title}
					</h2>
					<div className="heading__link">
						<AllLink />
					</div>
				</div>

				<div className="categories__inner categories-inner">
					{!isMedia600 ? (
						images.map((image, index) => (
							// <Img/>
							<Link
								key={index}
								href={image.href}
								className={`-ibg categories-inner__img`}
							>
								<Image
									src={image.src}
									alt={image.alt}
									className={`${loadingImageClass}`}
									onLoad={handleLoadingImageComplete}
								/>
								<span className="categories-inner__img-label">
									{image.title}
								</span>
							</Link>
						))
					) : (
						<></>
						// <Swiper />
					)}
				</div>
			</div>
		</section>
	);
};

export default Categories;
