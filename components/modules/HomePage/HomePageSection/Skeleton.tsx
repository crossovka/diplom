import ContentLoader from 'react-content-loader';

export const HomePageSectionSkeleton = () => {
	return (
		<ContentLoader
			speed={2}
			width={400}
			height={400}
			viewBox="0 0 400 400"
			// backgroundColor="#f3f3f3"
			// foregroundColor="#ecebeb"
		>
			<rect x="0" y="0" rx="10" ry="10" width="400" height="360" />
			<rect x="0" y="380" rx="4" ry="4" width="400" height="20" />
		</ContentLoader>
	);
};
