import AllLink from '@/components/elements/AllLink';
import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem';

import { IMainPageSectionProps } from '@/types/homePage';
import { HomePageSectionSkeleton } from './Skeleton';

const HomePageSection = ({ title, goods, isLoading }: IMainPageSectionProps) => (
	<div className="__container" style={{padding: '50px 0'}}>
		<div className="heading heading--with-link">
			<h2 className="heading__title h2">{title}</h2>
			<div className="heading__link">
				<AllLink link={'/catalog'} />
			</div>
		</div>

{/* //TODO при рендере сначала показывается No products found. нужно как-то это обработать (пока пендинг оно ещё не > 0 правильно?) */}
		{isLoading ? (
			<ul
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))',
				gap: '40px',
				gridAutoRows: '1fr',
			}}
		>
			{Array(4)
				.fill(0)
				.map((_, index) => (
					<li key={index}>
						<HomePageSectionSkeleton />
					</li>
				))}
			</ul>
		) : goods.length > 0 ? (
			<ul
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))',
					gap: '40px',
					gridAutoRows: '1fr',
				}}
			>
				{goods.map((item) => (
					<ProductsListItem key={item._id} item={item} title={item.name} />
				))}
			</ul>
		) : (
			<p style={{ textAlign: 'center' }}>No products found.</p>
		)}
	</div>
);

export default HomePageSection;
