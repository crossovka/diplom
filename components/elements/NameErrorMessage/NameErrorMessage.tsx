import { useLang } from '@/hooks/useLang';
import { INameErrorMessageProps } from '@/redux/slices/auth/types';

const NameErrorMessage = ({
	errors,
	className,
	fieldName,
}: INameErrorMessageProps) => {
	const { translations } = useLang();

	return (
		<>
			{errors[fieldName] && (
				<span className={className}>{errors[fieldName]?.message}</span>
			)}
			{errors[fieldName] && errors[fieldName]?.type === 'minLength' && (
				<span className={className}>{translations.validation.min_2}</span>
			)}
			{errors[fieldName] && errors[fieldName]?.type === 'maxLength' && (
				<span className={className}>
					{translations.validation.max_15}
				</span>
			)}
		</>
	);
};

export default NameErrorMessage;
