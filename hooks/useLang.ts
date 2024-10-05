import { useSelector } from 'react-redux';
import { selectLang } from '@/redux/slices/lang/selectors';
import translationsJson from '@/public/translations/translations.json';
import { AllowedLangs } from '@/redux/slices/lang/types';

export const useLang = () => {
  const lang: AllowedLangs = useSelector(selectLang);
  const translations = translationsJson[lang];

  return { lang, translations };
};