import { useLang } from '@/hooks/useLang';
import { nameValidationRules } from '@/lib/utils/forms';

import NameErrorMessage from '@/components/elements/NameErrorMessage/NameErrorMessage';

import { IAuthInput } from '@/redux/slices/auth/types';

const NameInput = ({ register, errors }: IAuthInput) => {
	const { translations } = useLang();

	return (
		<div className="form__block">
			<input
				type="text"
				className="form__block__input"
				placeholder={translations.auth_modal.name}
				{...register(
					'name',
					nameValidationRules(
						translations.validation.invalid_value,
						translations.validation.requiredName
					)
				)}
			/>
			<NameErrorMessage
				errors={errors}
				className={'styles.error_alert'}
				fieldName="name"
			/>
		</div>
	);
};

export default NameInput;
