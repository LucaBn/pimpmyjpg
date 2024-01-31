import React from "react";

// Components
import Text from "@/components/UI/Atoms/Text/Text";
import LanguageHandler from "@/components/UI/Organisms/LanguageHandler/LanguageHandler";
import ThemeHandler from "@/components/UI/Organisms/ThemeHandler/ThemeHandler";

// Locales
import { useTranslation } from "react-i18next";

const OptionsModalForm: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Text tag="p" attributeList={{ className: "mb-2" }}>
        {t("navbar.options.select-language")}:
      </Text>
      <LanguageHandler />

      <Text tag="p" attributeList={{ className: "mt-3 mb-2" }}>
        {t("navbar.options.select-theme")}:
      </Text>
      <ThemeHandler />
    </>
  );
};

export default OptionsModalForm;
