import { useSelector } from 'react-redux';
import { selectLang } from '@/redux/slices/lang/selectors';
import translationsJson from '@/public/translations/translations.json';

export const useLang = () => {
  const lang = useSelector(selectLang);
  const translations = translationsJson[lang];

  return { lang, translations };
};