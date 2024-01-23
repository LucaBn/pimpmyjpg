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

// Define the context
export interface IThemeContext {
  theme: Themes;
  toggleTheme: () => void;
}

const LS_THEME_VARIABLE = "pmjTheme";

// Default createContextValue
const defaultCreateContextValue = {
  theme: Themes.Dark,
  toggleTheme: () => {},
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

  const toggleTheme = () => {
    const newValue = theme === Themes.Dark ? Themes.Light : Themes.Dark;
    setTheme(newValue);
    writeToLocalStorage(LS_THEME_VARIABLE, newValue);
  };

  const themeValues: IThemeContext = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};
