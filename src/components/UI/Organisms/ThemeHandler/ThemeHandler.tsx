import React from "react";

// Components
import IconMoon from "@/components/UI/Atoms/IconMoon/IconMoon";
import IconSun from "@/components/UI/Atoms/IconSun/IconSun";
import { Col, Form } from "react-bootstrap";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { IImage } from "@/typings/icons";

// Locales
import { useTranslation } from "react-i18next";

// Constants
import { ThemeList } from "@/constants/themes";
import { CLASS_APP_NAME } from "@/constants/html-classes";

interface IThemeHandler extends IImage {}

const THEME_OPTIONS = Object.values(ThemeList);

const ThemeHandler: React.FC<IThemeHandler> = ({ forceColor }) => {
  const { theme, changeTheme } = useTheme();

  const { t } = useTranslation("common");

  const handleTheme = (newTheme: ThemeList) => {
    changeTheme(newTheme);
  };

  const getThemeIcon = (theme: ThemeList): JSX.Element => {
    return theme === ThemeList.Dark ? (
      <IconMoon forceColor={forceColor} />
    ) : theme === ThemeList.Light ? (
      <IconSun forceColor={forceColor} />
    ) : (
      <></>
    );
  };

  return (
    <Form>
      <Form.Group as={Col} className="d-flex gap-3">
        {THEME_OPTIONS.map((option) => (
          <Form.Check
            key={option}
            type="radio"
            name="language"
            id={`${CLASS_APP_NAME}-radio__${option}`}
            className={`${CLASS_APP_NAME}-radio__theme`}
            label={<div className="mx-1">{getThemeIcon(option)}</div>}
            value={option}
            checked={theme === option}
            onChange={() => handleTheme(option)}
            title={t(`navbar.theme.${option}`)}
          />
        ))}
      </Form.Group>
    </Form>
  );
};

export default ThemeHandler;
