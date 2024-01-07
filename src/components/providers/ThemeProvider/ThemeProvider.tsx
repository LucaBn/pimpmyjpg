import React, { useState, useEffect, createContext, useContext } from "react";

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
interface IThemeContext {
  theme: Themes;
  toggleTheme: () => void;
}

// Default createContextValue
const defaultCreateContextValue = {
  theme: Themes.Dark,
  toggleTheme: () => {},
};

const ThemeContext = createContext<IThemeContext>(defaultCreateContextValue);

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
    console.log("IN");
    console.log({ theme });

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

// Define a custom hook to use the theme context
export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
