'use client';

import { useLang } from "@/hooks/useLang";

import styles from "./Hero.module.scss";

export const Hero: React.FC = () => {
	const {translations} = useLang();

	return (
		<section className={styles.hero}>
			<div className={`__container ${styles.hero__container}`}>
				<h3>{translations.homePage.hero.title}</h3>
			</div>
		</section>
	);
};
