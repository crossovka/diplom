'use client';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import styles from './AllLink.module.scss';

const AllLink = ({ link }: { link?: string }) => {
	const { translations } = useLang();

	// TODO текст внутри тоже передавать в пропсах?
	return (
		<Link href={link || `/catalog`} className={styles.all}>
			<span />
			{translations.common.all_link}
		</Link>
	);
};

export default AllLink;