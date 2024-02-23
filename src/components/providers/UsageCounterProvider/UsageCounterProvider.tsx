import React, { useState, useEffect, createContext } from "react";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/local-storage";

// Typings
import { IGenericComponent } from "@/typings/components";

// Constants
import { APP_NAME_SHORT } from "@/constants/app";

// Define the context
export interface IUsageCounterContext {
  usageCounter: number;
  updateUsageCounter: () => void;
}

const lowercaseAppName = APP_NAME_SHORT.toLowerCase();
const LS_USAGE_COUNTER_VARIABLE = `${lowercaseAppName}UsageCounter`;

// Default createContextValue
const defaultCreateContextValue = {
  usageCounter: 0,
  updateUsageCounter: () => {},
};

export const UsageCounterContext = createContext<IUsageCounterContext>(
  defaultCreateContextValue
);

export const UsageCounterProvider: React.FC<IGenericComponent> = ({
  children,
}) => {
  const [usageCounter, setUsageCounter] = useState<number>(0);

  useEffect(() => {
    const storedPmjUsageCounter = readFromLocalStorage(
      LS_USAGE_COUNTER_VARIABLE
    );
    setUsageCounter(Number(storedPmjUsageCounter));
  }, []);

  const updateUsageCounter = () => {
    const newUsageCounter = usageCounter + 1;
    setUsageCounter(newUsageCounter);
    writeToLocalStorage(LS_USAGE_COUNTER_VARIABLE, newUsageCounter);
  };

  const usageCounterValues: IUsageCounterContext = {
    usageCounter,
    updateUsageCounter,
  };

  return (
    <UsageCounterContext.Provider value={usageCounterValues}>
      {children}
    </UsageCounterContext.Provider>
  );
};
