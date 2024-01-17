import React from "react";

// Components
import IconMoon from "@/components/UI/Atoms/IconMoon/IconMoon";
import IconSun from "@/components/UI/Atoms/IconSun/IconSun";
import { Button } from "react-bootstrap";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Constants
import { Themes } from "@/constants/themes";
import { CLASS_APP_NAME } from "@/constants/html-classes";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const VisibleIcon: JSX.Element =
    theme === Themes.Dark ? <IconMoon /> : <IconSun />;

  return (
    <Button
      variant="link"
      className={`${CLASS_APP_NAME}-theme-toggle rounded-0`}
      onClick={toggleTheme}
    >
      {VisibleIcon}
    </Button>
  );
};

export default ThemeToggle;
