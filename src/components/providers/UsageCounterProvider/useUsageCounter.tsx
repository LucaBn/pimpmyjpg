import { useContext } from "react";

import {
  IUsageCounterContext,
  UsageCounterContext,
} from "@/components/providers/UsageCounterProvider/UsageCounterProvider";

// Define a custom hook to use the borders context
export const useUsageCounter = (): IUsageCounterContext => {
  const context = useContext(UsageCounterContext);

  if (!context) {
    throw new Error(
      "useUsageCounter must be used within a UsageCounterProvider"
    );
  }
  return context;
};
