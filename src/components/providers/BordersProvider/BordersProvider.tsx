import React, { useState, useEffect, createContext } from "react";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/local-storage";

// Typings
import { IGenericComponent } from "@/typings/components";

// Constants
import { Borders } from "@/constants/borders";
import { APP_NAME } from "@/constants/app";

// Define the context
export interface IBordersContext {
  borders: Borders;
  changeBorders: (newBorders: Borders) => void;
}

const lowercaseAppName = APP_NAME.toLowerCase();
const LS_BORDERS_VARIABLE = `${lowercaseAppName}Borders`;

// Default createContextValue
const defaultCreateContextValue = {
  borders: Borders.Rounded,
  changeBorders: () => {},
};

export const BordersContext = createContext<IBordersContext>(
  defaultCreateContextValue
);

export const BordersProvider: React.FC<IGenericComponent> = ({ children }) => {
  const [borders, setBorders] = useState<Borders>(Borders.Rounded);

  useEffect(() => {
    const storedPmjBorders = readFromLocalStorage(LS_BORDERS_VARIABLE);

    switch (storedPmjBorders) {
      case Borders.Rounded:
        setBorders(Borders.Rounded);
        break;
      case Borders.Squared:
        setBorders(Borders.Squared);
        break;
      default:
        break;
    }
  }, []);

  const changeBorders = (newBorders: Borders) => {
    setBorders(newBorders);
    writeToLocalStorage(LS_BORDERS_VARIABLE, newBorders);
  };

  const bordersValues: IBordersContext = {
    borders,
    changeBorders,
  };

  return (
    <BordersContext.Provider value={bordersValues}>
      {children}
    </BordersContext.Provider>
  );
};
