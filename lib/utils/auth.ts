import toast from 'react-hot-toast'
import { setIsAuth } from '@/redux/slices/auth/slice'
import { loginCheck } from '@/redux/slices/user/asyncActions'
import { handleCloseAuthModal } from './modals'
import { AppDispatch } from '@/redux/store'
import { IUser } from '@/redux/slices/user/types'

export const onAuthSuccess = <T>(message: string, data: T, dispatch: AppDispatch) => {
	localStorage.setItem('auth', JSON.stringify(data))
	toast.success(message)
	console.log('data', data);
	handleCloseAuthModal(dispatch);
	setIsAuth(true)
}

export const isUserAuth = () => {
	const auth = JSON.parse(localStorage.getItem('auth') as string)

	if (!auth?.accessToken) {
		setIsAuth(false)
		return false
	}

	return true
}
// TODO вы можете использовать хуки, middleware или Context API для улучшения архитектуры и уменьшения повторного кода. 
/**
 * Можно в хуки вынести такие функции, чтобы логику с dispatch инкапсулировать так сказать
 * Trigger loginCheck action with accessToken from localStorage
 * @param dispatch redux store's dispatch
 * @returns nothing
 * 
 * @example
 * ```
 * import { useDispatch } from 'react-redux';
		const useLoginCheck = () => {
				const dispatch = useDispatch();

				const triggerLoginCheck = () => {
						const auth = JSON.parse(localStorage.getItem('auth') as string);
						if (auth?.accessToken) {
								dispatch(loginCheck({ jwt: auth.accessToken }));
						}
				};

				return triggerLoginCheck;
		};
 * ```
 * потом в компоненте просто
 * const triggerLoginCheck = useLoginCheck();
 * triggerLoginCheck();
 */
export const triggerLoginCheck = (dispatch: AppDispatch) => {
	if (!isUserAuth()) {
		return
	}

	const auth = JSON.parse(localStorage.getItem('auth') as string)

	// loginCheck({ jwt: auth.accessToken })
	dispatch(loginCheck({ jwt: auth.accessToken }))
}
