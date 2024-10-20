import { closeAuthModal, openAuthModal } from "@/redux/slices/auth/slice"
import { closeQuickViewModal, closeSearchModal, closeSizeTableModal, openSearchModal } from "@/redux/slices/modals/slice"
import { AppDispatch } from "@/redux/store"

export const addOverflowHiddenToBody = (paddingRight = '') => {
	const body = document.querySelector('body') as HTMLBodyElement
	body.classList.add('lock')
	// paddingRight && (body.style.paddingRight = paddingRight)
	body.style.paddingRight = paddingRight ? paddingRight : '';
}

export const removeOverflowHiddenFromBody = () => {
	if (typeof window !== 'undefined') {
		const body = document.querySelector('body') as HTMLBodyElement
		body.classList.remove('lock')
	}
}

// search-modal ========================================================================================================================================================
export const handleOpenSearchModal = (dispatch: AppDispatch) => {
	addOverflowHiddenToBody()
	dispatch(openSearchModal());
};

export const handleCloseSearchModal = (dispatch: AppDispatch) => {
	removeOverflowHiddenFromBody()
	dispatch(closeSearchModal());
}
// search-modal ========================================================================================================================================================

// quick-view ========================================================================================================================================================
export const handleCloseQuickViewModal = (dispatch: AppDispatch) => {
	removeOverflowHiddenFromBody();
	dispatch(closeQuickViewModal());
};
// quick-view ========================================================================================================================================================

// size-table ========================================================================================================================================================
// Передаю distpatch потому что useAppDispatch нельзя юзать не внутри React.FC
export const closeSizeTableByCheck = (dispatch: AppDispatch, isSizeTableModalOpen: boolean) => {
	if (!isSizeTableModalOpen) {
		removeOverflowHiddenFromBody()
	}

	// Закрытие модального окна через dispatch
	dispatch(closeSizeTableModal());
};
// size-table ========================================================================================================================================================

// Auth ========================================================================================================================================================
export const handleOpenAuthModal = (dispatch: AppDispatch) => {
	addOverflowHiddenToBody()
	dispatch((openAuthModal()));
}

export const handleCloseAuthModal = (dispatch: AppDispatch) => {
	removeOverflowHiddenFromBody()
	dispatch((closeAuthModal()));
}

/**
 * Закрывает модальное окно авторизации если открыто QuickViewModal
 * или SizeTableModal, иначе закрывает модальное окно авторизации
 * с помощью handleCloseAuthModal
 * нужно для коррекнтой работы removeOverflowHiddenToHtml
 * @param dispatch - диспатчер для закрытия модального окна
 * @param showQuickViewModal - открыто ли QuickViewModal
 * @param showSizeTable - открыто ли SizeTableModal
 */
export const closeAuthModalWhenSomeModalOpened = (
	dispatch: AppDispatch,
	showQuickViewModal: boolean,
	showSizeTable: boolean
) => {
	if (showQuickViewModal || showSizeTable) {
		dispatch((closeAuthModal()));
		return
	}

	handleCloseAuthModal(dispatch)
}

// Auth ========================================================================================================================================================