import React, { useState, useEffect, createContext } from "react";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/localStorage";

// Typings
import { IGenericComponent } from "@/typings/components";

// Constants
import { Themes } from "@/constants/themes";

// Define the context
export interface IThemeContext {
  theme: Themes;
  toggleTheme: () => void;
}

// Default createContextValue
const defaultCreateContextValue = {
  theme: Themes.Dark,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<IThemeContext>(
  defaultCreateContextValue
);

export const ThemeProvider: React.FC<IGenericComponent> = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(Themes.Dark); // Default theme is 'dark'

  useEffect(() => {
    const storedBsTheme = readFromLocalStorage("bsTheme");

    switch (storedBsTheme) {
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
    writeToLocalStorage("bsTheme", newValue);
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
