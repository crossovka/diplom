import { useLang } from '@/hooks/useLang';

import { IAuthInput } from '@/redux/slices/auth/types';

const PasswordInput = ({ register, errors }: IAuthInput) => {
	const { translations } = useLang();

	return (
		<div className="form__block">
			<input
				type="password"
				className="form__block__input"
				placeholder={translations.auth_modal.password}
				{...register('password', {
					required: translations.validation.required_password,
					minLength: 4,
					maxLength: 40,
				})}
			/>
			{errors.password && (
				<span className={"styles.error_alert"}>{errors.password?.message}</span>
			)}
			{errors.password && errors.password.type === 'minLength' && (
				<span className={"styles.error_alert"}>
					{translations.validation.min_4}
				</span>
			)}
			{errors.password && errors.password.type === 'maxLength' && (
				<span className={"styles.error_alert"}>
					{translations.validation.max_20}
				</span>
			)}
		</div>
	);
};
export default PasswordInput;
