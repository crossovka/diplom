'use client';

import Hero from "@/components/modules/HomePage/Hero/Hero";
import Categories from '../../modules/HomePage/Categories/Categories';
import NewGoods from "@/components/modules/HomePage/NewGoods/NewGoods";
import BestsellersGoods from "@/components/modules/HomePage/BestsellersGoods/BestsellersGoods";

const HomePage: React.FC = () => {
	return (
		<main>
			<Hero />
			<Categories />
			<NewGoods/>
			<BestsellersGoods/>
		</main>
	);
};

export default HomePage;