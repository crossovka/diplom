import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

const QuickViewModalSlider = ({ images }: { images: string[] }) => {
	const settings = {
		slidesPerView: 1,
		spaceBetween: 20,
		pagination: {
			clickable: true,
		},
		navigation: true,
	};

	return (
		// TODO useProductImages или получать с бека src alt и прочее id
		<Swiper {...settings}>
			{images.map((image, index) => (
				<SwiperSlide
					key={index}
					className={'-ibg_contain'}
					style={{ width: '200px', height: '200px' }}>
					<Image src={image} alt={`Image ${index + 1}`} fill />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default QuickViewModalSlider;