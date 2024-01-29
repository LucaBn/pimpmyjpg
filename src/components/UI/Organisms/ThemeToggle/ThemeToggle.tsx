import React from "react";

// Components
import IconMoon from "@/components/UI/Atoms/IconMoon/IconMoon";
import IconSun from "@/components/UI/Atoms/IconSun/IconSun";
import { Button } from "react-bootstrap";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { IImage } from "@/typings/icons";

// Constants
import { Themes } from "@/constants/themes";
import { CLASS_APP_NAME } from "@/constants/html-classes";

interface IThemeToggle extends IImage {}

const ThemeToggle: React.FC<IThemeToggle> = ({ forceColor }) => {
  const { theme, toggleTheme } = useTheme();

  const VisibleIcon: JSX.Element =
    theme === Themes.Dark ? (
      <IconMoon forceColor={forceColor} />
    ) : (
      <IconSun forceColor={forceColor} />
    );

  return (
    <Button
      aria-label="Toggle theme"
      variant="link"
      className={`${CLASS_APP_NAME}-theme-toggle rounded-0 me-auto p-0`}
      onClick={toggleTheme}
    >
      {VisibleIcon}
    </Button>
  );
};

export default ThemeToggle;
