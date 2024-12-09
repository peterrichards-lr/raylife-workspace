import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './common/locale/en.json';

const resources = {
   en: { ...enJSON }
 };

 const getCurrentLanguageKey = () => {
   const [languageKey] = Liferay.ThemeDisplay.getLanguageId().split("_");
 
   return languageKey;
 };
 
 i18n
   .use(initReactI18next)
   .init({
     resources,
     lng: getCurrentLanguageKey(),
   });
 
   export default i18n;