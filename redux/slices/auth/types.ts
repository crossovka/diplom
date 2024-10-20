import { FieldErrors, FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

export interface AuthState {
	isAuth: boolean;
	isAuthModalOpen: boolean;
	// user: IUser | null;
	error: string | null;
	isLoading: boolean,
}

export interface IInputs {
	name: string
	email: string
	password: string
}

export interface ISignUp {
	password: string
	email: string
	// isOAuth?: boolean
	// в логине имя не нужно
	name?: string
}
// ISignIn equal to ISignUp

export interface IAuthSideProps {
	toggleAuth: VoidFunction
	isSideActive: boolean
}

export interface IAuthInput {
	register: UseFormRegister<IInputs>
	errors: Partial<FieldErrorsImpl<IInputs>>
}

export interface INameErrorMessageProps {
	errors: FieldErrors<IInputs & { [index: string]: string }>
	fieldName: string
	className?: string
}