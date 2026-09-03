"use client";

import { useTranslation } from "react-i18next";
import { ThemeSwitcher } from '../components/core/ThemeSwitcher';

export default function WelcomePage() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">
        {t("welcome", { defaultValue: "Bienvenido al Proyecto" })}
      </h1>

      <div className="flex gap-4 mt-8">
        <ThemeSwitcher />
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700"
        >
          {i18n.language === "es" ? "English" : "Español"}
        </button>
      </div>

      <p className="mt-8 text-gray-500 dark:text-gray-400">
        {t("status", { defaultValue: "Entorno de desarrollo funcional" })}
      </p>
    </div>
  );
}
