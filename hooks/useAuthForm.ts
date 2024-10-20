import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectIsAuthLoading } from '@/redux/slices/auth/selectors';
import { IInputs } from '@/redux/slices/auth/types';

export const useAuthForm = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsAuthLoading);

	// Работа с формой
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IInputs>();

	return {
		isLoading, // Вместо spinner
		register,
		errors,
		handleSubmit
	};
};