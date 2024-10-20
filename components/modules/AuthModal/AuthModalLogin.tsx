import Link from 'next/link';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch } from '@/redux/store';
import { signIn } from '@/redux/slices/auth/asyncActions';

import { useAuthForm } from '@/hooks/useAuthForm';
import { useLang } from '@/hooks/useLang';
import { handleCloseAuthModal } from '@/lib/utils/modals';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

import { IAuthSideProps, IInputs } from '@/redux/slices/auth/types';

const AuthModalLogin = ({ toggleAuth }: IAuthSideProps) => {
	const dispatch = useAppDispatch();

	const { translations } = useLang();
	const { isLoading, register, errors, handleSubmit } = useAuthForm();

	const submitForm = (data: IInputs) =>
		dispatch(
			signIn({
				email: data.email,
				password: data.password,
			})
		);

	return (
		<div className="card-back">
			<h3 className="card-body__title">{translations.auth_modal.login_text}</h3>
			<p className="card-body__description">
				{translations.auth_modal.login_description}
			</p>
			<form onSubmit={handleSubmit(submitForm)}>
				<EmailInput register={register} errors={errors} />
				<PasswordInput register={register} errors={errors} />
				<div className="card-body__inner">
					<div className="inner__top">
						<button className="inner__btn" type="submit" disabled={isLoading}>
							{isLoading ? (
								<FontAwesomeIcon icon={faSpinner} spin />
							) : (
								translations.auth_modal.login_text
							)}
						</button>
						<Link
							href="/password-restore"
							className="inner__reset"
							onClick={() => handleCloseAuthModal(dispatch)}
						>
							{translations.auth_modal.forgot_password}
						</Link>
					</div>
					<div className="inner__bottom">
						<span className="inner__bottom__text">
							{translations.auth_modal.login_question}
						</span>
						<button
							type="button"
							className="btn-reset inner__switch"
							onClick={toggleAuth}
						>
							{translations.auth_modal.register}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AuthModalLogin;
