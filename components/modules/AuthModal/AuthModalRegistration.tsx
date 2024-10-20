import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useLang } from '@/hooks/useLang';
import { useAuthForm } from '@/hooks/useAuthForm';

import { useAppDispatch } from '@/redux/store';
import { signUp } from '@/redux/slices/auth/asyncActions';

import NameInput from './NameInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import { IAuthSideProps, IInputs } from '@/redux/slices/auth/types';

const AuthModalRegistration = ({ toggleAuth }: IAuthSideProps) => {
	const dispatch = useAppDispatch();

	const { translations } = useLang();
	const { isLoading, register, errors, handleSubmit } = useAuthForm();

	const submitForm = (data: IInputs) =>
		dispatch(
			signUp({
				name: data.name,
				email: data.email,
				password: data.password,
			})
		);

	return (
		<div className="auth-modal__registration auth-modal-registration">
			<h3 className="auth-modal-registration__title">
				{translations.auth_modal.registration_title}
			</h3>
			<p className="auth-modal-registration__description">
				{translations.auth_modal.registration_description}
			</p>
			<form onSubmit={handleSubmit(submitForm)}>
				<NameInput register={register} errors={errors} />
				<EmailInput register={register} errors={errors} />
				<PasswordInput register={register} errors={errors} />
				<div className="auth-modal-registration__inner auth-modal-registration-inner">
					<div className="auth-modal-registration-inner__top">
						<button
							className="auth-modal-registration-inner__submit"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? (
								<FontAwesomeIcon icon={faSpinner} spin />
							) : (
								translations.auth_modal.registration_text
							)}
						</button>
					</div>
					<div className="auth-modal-registration-inner__bottom">
						<span className="auth-modal-registration-inner__bottom-text">
							{translations.auth_modal.registration_question}
						</span>
						<button
							type="button"
							className="auth-modal-registration-inner__bottom-switcher"
							onClick={toggleAuth}
						>
							{translations.auth_modal.login_text}!
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AuthModalRegistration;
