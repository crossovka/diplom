const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<div className="wrapper">
					{children}
				</div>
			</body>
		</html>
	);
};

export default PagesLayout;