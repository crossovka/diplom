'use client';

import { Hero } from "@/components/modules/HomePage/Hero/Hero";
import Categories from '../../modules/HomePage/Categories/Categories';

const HomePage: React.FC = () => {
	return (
		<main>
			<Hero />
			<Categories />
		</main>
	);
};

export default HomePage;
