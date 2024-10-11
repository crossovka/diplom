import { getCartItemCountBySize } from '@/lib/utils/common';

import { IProductCountBySizeProps } from '@/types/goods';

const ProductCountBySize = ({
	products,
	size,
	withCartIcon = true,
}: IProductCountBySizeProps) => (
	<>
		{!!getCartItemCountBySize(products, size) && (
			<span
				className={`${'styles.count'} ${withCartIcon ? 'styles.count--with_icon' : ''}`}
			>
				<span>{getCartItemCountBySize(products, size)}</span>
			</span>
		)}
	</>
);

export default ProductCountBySize;