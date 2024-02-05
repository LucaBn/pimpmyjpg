import React, { useState, useEffect, createContext } from "react";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/local-storage";

// Typings
import { IGenericComponent } from "@/typings/components";

// Constants
import { BorderList } from "@/constants/borders";
import { APP_NAME } from "@/constants/app";

// Define the context
export interface IBordersContext {
  borders: BorderList;
  changeBorders: (newBorders: BorderList) => void;
}

const lowercaseAppName = APP_NAME.toLowerCase();
const LS_BORDERS_VARIABLE = `${lowercaseAppName}Borders`;

// Default createContextValue
const defaultCreateContextValue = {
  borders: BorderList.Rounded,
  changeBorders: () => {},
};

export const BordersContext = createContext<IBordersContext>(
  defaultCreateContextValue
);

export const BordersProvider: React.FC<IGenericComponent> = ({ children }) => {
  const [borders, setBorders] = useState<BorderList>(BorderList.Rounded);

  useEffect(() => {
    const storedPmjBorders = readFromLocalStorage(LS_BORDERS_VARIABLE);

    switch (storedPmjBorders) {
      case BorderList.Rounded:
        setBorders(BorderList.Rounded);
        break;
      case BorderList.Squared:
        setBorders(BorderList.Squared);
        break;
      default:
        break;
    }
  }, []);

  const changeBorders = (newBorders: BorderList) => {
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
