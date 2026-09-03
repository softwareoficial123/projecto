import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: {
        welcome: "Bienvenido al Proyecto",
        status: "Entorno de desarrollo funcional",
      },
    },
    en: {
      translation: {
        welcome: "Welcome to the Project",
        status: "Functional development environment",
      },
    },
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
