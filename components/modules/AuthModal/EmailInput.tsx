import { useLang } from '@/hooks/useLang';
import { emailValidationRules } from '@/lib/utils/forms';

import { IAuthInput } from '@/redux/slices/auth/types';

const EmailInput = ({ register, errors }: IAuthInput) => {
	const { translations } = useLang();

	return (
		<div className="form__block">
			<input
				type="email"
				className="form__block__input"
				placeholder="Email"
				{...register(
					'email',
					emailValidationRules(
						translations.validation.invalid_email,
						translations.validation.required_email
					)
				)}
			/>
			{/* NameErrorMessage не использовал так как тут всего одна проверка */}
			{errors.email && (
				<span className={'styles.error_alert'}>{errors.email?.message}</span>
			)}
		</div>
	);
};

export default EmailInput;
