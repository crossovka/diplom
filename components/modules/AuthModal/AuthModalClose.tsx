import { useAppDispatch, useAppSelector } from '@/redux/store';

import { closeAuthModalWhenSomeModalOpened } from '@/lib/utils/modals';
import { selectIsQuickViewModalOpen, selectIsSizeTableModalOpen } from '@/redux/slices/modals/selectors';

const AuthModalClose = () => {
	const dispatch = useAppDispatch();
	
	const IsQuickViewModalOpen = useAppSelector(selectIsQuickViewModalOpen);
	const IsSizeTableModalOpen = useAppSelector(selectIsSizeTableModalOpen);

	// Повторяется в Layout
	const closePopup = () => closeAuthModalWhenSomeModalOpened(dispatch, IsQuickViewModalOpen, IsSizeTableModalOpen);

	return (
		<button className="modal__close auth-modal__close" onClick={closePopup} />
	);
};

export default AuthModalClose;
