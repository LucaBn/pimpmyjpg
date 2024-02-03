import React from "react";

// Components
import FlagEn from "@/components/UI/Atoms/FlagEn/FlagEn";
import FlagIt from "@/components/UI/Atoms/FlagIt/FlagIt";
import FlagJp from "@/components/UI/Atoms/FlagJp/FlagJp";
import { Col, Form } from "react-bootstrap";

// Utils
import { generateClassNameValue } from "@/utils/html-classes";

// Locales
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

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

const LanguageHandler: React.FC = () => {
  const { i18n } = useTranslation("common");
  const { language, changeLanguage } = i18n;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const flagContainerClassList = (flagLanguage: LanguageList) => {
    const classList = [`${CLASS_APP_NAME}-flag`, `position-relative`];

    if (flagLanguage === language) {
      classList.push(`${CLASS_APP_NAME}-flag--active`);
    }

    return generateClassNameValue(classList);
  };

  const handleLanguage = (selectedLanguage: LanguageList) => {
    const splitLocation = pathname.split("/");
    splitLocation[1] = selectedLanguage;
    const newLocation = splitLocation.join("/");

    changeLanguage(selectedLanguage);
    navigate(newLocation);
  };

  return (
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
  );
};

export default LanguageHandler;
