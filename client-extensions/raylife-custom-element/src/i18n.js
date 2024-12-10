import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from './common/locale/en.json';
import esJSON from './common/locale/es.json';
import { getCurrentLanguageKey } from './common/utils/liferay';

const resources = {
  en: { ...enJSON },
  es: { ...esJSON },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getCurrentLanguageKey(),
});

export default i18n;
