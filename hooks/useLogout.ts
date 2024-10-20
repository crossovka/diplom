import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { setIsAuth } from '@/redux/slices/auth/slice'

// TODO когда логаут делаю в шапке остаётся профиль (Если перезагрузить страницу то всё ок)
export const useUserLogout = () => {
	const router = useRouter()

	return () => {
		localStorage.removeItem('auth')
		setIsAuth(false)
		router.push('/')
		window.location.reload()
		toast.success('Вы вышли из аккаунта')
	}
}