import React from "react";

// Components
import BordersHandler from "@/components/UI/Organisms/BordersHandler/BordersHandler";
import LanguageHandler from "@/components/UI/Organisms/LanguageHandler/LanguageHandler";
import ThemeHandler from "@/components/UI/Organisms/ThemeHandler/ThemeHandler";

// Locales
import { useTranslation } from "react-i18next";

const OptionsModalForm: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <p className={"mb-2"}>{t("navbar.options.select-language")}:</p>
      <LanguageHandler />

      <p className={"mt-3 mb-2"}>{t("navbar.options.select-theme")}:</p>
      <ThemeHandler />

      <p className={"mt-3 mb-2"}>{t("navbar.options.select-borders")}:</p>
      <BordersHandler />
    </>
  );
};

export default OptionsModalForm;
