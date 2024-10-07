import { useState } from 'react';

/**
 * Hook for preloading images.
 *
 * @param {string} [initialLoadingClass = 'img-loading'] - custom class name for loading image
 *
 * @returns {{ handleLoadingImageComplete: (img: React.SyntheticEvent<HTMLImageElement, Event>) => void, isImgLoading: boolean, loadingImageClass: string }}
 *
 * @example
 * import Image from 'next/image';
 * import useImagePreloader from '@/hooks/useImagePreloader';
 *
 * const MyComponent = () => {
 *  const { handleLoadingImageComplete, loadingImageClass } = useImagePreloader();
 *
 *  return (
 *    <Image
 *      src="/images/image.jpg"
 *      alt="Image"
 *      className={loadingImageClass}
 *      onLoad={handleLoadingImageComplete}
 *    />
 *  );
 * }
 */
const useImagePreloader = (initialLoadingClass = 'img-loading') => {
	const [isImgLoading, setIsImgLoading] = useState(true);

	const handleLoadingImageComplete = (
		img: React.SyntheticEvent<HTMLImageElement, Event>
	) => {
		img.currentTarget.classList.remove(initialLoadingClass);
		setIsImgLoading(false);
	};

	// Класс для изображения
	const loadingImageClass = isImgLoading ? initialLoadingClass : '';

	return { handleLoadingImageComplete, loadingImageClass };
};

export default useImagePreloader;

// const useImagePreloader = (initialLoadingClass = `img-loading transition-opacity opacity-0 duration`) => {