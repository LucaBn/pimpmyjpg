import React from "react";

// Components
import Text from "@/components/UI/Atoms/Text/Text";
import FlagEn from "@/components/UI/Atoms/FlagEn/FlagEn";
import FlagIt from "@/components/UI/Atoms/FlagIt/FlagIt";
import FlagJp from "@/components/UI/Atoms/FlagJp/FlagJp";
import ThemeToggle from "@/components/UI/Organisms/ThemeToggle/ThemeToggle";
import { Col, Form } from "react-bootstrap";

// Locales
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Utils
import { generateClassNameValue } from "@/utils/html-classes";

// Typings
import { LanguageList } from "@/typings/i18next";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";

type LanguageOption = {
  language: LanguageList;
  flagComponent: JSX.Element;
  title: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    language: LanguageList.En,
    flagComponent: <FlagEn />,
    title: "English",
  },
  {
    language: LanguageList.It,
    flagComponent: <FlagIt />,
    title: "Italiano",
  },
  {
    language: LanguageList.Jp,
    flagComponent: <FlagJp />,
    title: "日本語",
  },
];

const OptionsModalForm: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  const { language, changeLanguage } = i18n;

  const location = useLocation();
  const navigate = useNavigate();

  const flagContainerClassList = (flagLanguage: LanguageList) => {
    const classList = [`${CLASS_APP_NAME}-flag`, `position-relative`];

    if (flagLanguage === language) {
      classList.push(`${CLASS_APP_NAME}-flag--active`);
    }

    return generateClassNameValue(classList);
  };

  const handleLanguage = (selectedLanguage: LanguageList) => {
    const splitLocation = location.pathname.split("/");
    splitLocation[1] = selectedLanguage;
    const newLocation = splitLocation.join("/");

    changeLanguage(selectedLanguage);
    navigate(newLocation);
  };

  return (
    <>
      <Text tag="p" attributeList={{ className: "mb-2" }}>
        {t("navbar.options.select-language")}:
      </Text>
      <Form>
        <Form.Group as={Col} className=" d-flex gap-3">
          {LANGUAGE_OPTIONS.map((option) => (
            <Form.Check
              key={option.language}
              id={`${CLASS_APP_NAME}-radio__${option.language}`}
              type="radio"
              name="language"
              label={
                <div className={flagContainerClassList(option.language)}>
                  {option.flagComponent}
                </div>
              }
              value={option.language}
              checked={language === option.language}
              onChange={() => handleLanguage(option.language)}
              title={option.title}
            />
          ))}
        </Form.Group>
      </Form>

      <Text tag="p" attributeList={{ className: "mt-3 mb-2" }}>
        Select Theme:
      </Text>
      <ThemeToggle />
    </>
  );
};

export default OptionsModalForm;
