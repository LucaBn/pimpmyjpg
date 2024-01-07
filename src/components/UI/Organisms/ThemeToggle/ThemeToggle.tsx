import React from "react";

// Components
import IconMoon from "@/components/UI/Atoms/IconMoon/IconMoon";
import IconSun from "@/components/UI/Atoms/IconSun/IconSun";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider/ThemeProvider";

// Constants
import { Themes } from "@/constants/themes";
import { CLASS_APP_NAME } from "@/constants/html-classes";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const VisibleIcon: JSX.Element =
    theme === Themes.Dark ? <IconMoon /> : <IconSun />;

  return (
    <div
      className={`${CLASS_APP_NAME}-theme-toggle me-2`}
      onClick={toggleTheme}
    >
      {VisibleIcon}
    </div>
  );
};

export default ThemeToggle;
