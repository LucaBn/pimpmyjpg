import React, { useState, useEffect, createContext } from "react";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/local-storage";

// Typings
import { IGenericComponent } from "@/typings/components";

// Constants
import { Themes } from "@/constants/themes";
import { APP_NAME } from "@/constants/app";

// Define the context
export interface IThemeContext {
  theme: Themes;
  changeTheme: (newTheme: Themes) => void;
}

const lowercaseAppName = APP_NAME.toLowerCase();
const LS_THEME_VARIABLE = `${lowercaseAppName}Theme`;

// Default createContextValue
const defaultCreateContextValue = {
  theme: Themes.Dark,
  changeTheme: () => {},
};

export const ThemeContext = createContext<IThemeContext>(
  defaultCreateContextValue
);

export const ThemeProvider: React.FC<IGenericComponent> = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(Themes.Dark);

  useEffect(() => {
    const storedPmjTheme = readFromLocalStorage(LS_THEME_VARIABLE);

    switch (storedPmjTheme) {
      case Themes.Dark:
        setTheme(Themes.Dark);
        break;
      case Themes.Light:
        setTheme(Themes.Light);
        break;
      default:
        break;
    }
  }, []);

  const changeTheme = (newTheme: Themes) => {
    setTheme(newTheme);
    writeToLocalStorage(LS_THEME_VARIABLE, newTheme);
  };

  const themeValues: IThemeContext = {
    theme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};
