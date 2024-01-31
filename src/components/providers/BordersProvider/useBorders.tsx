import { useContext } from "react";

import {
  IBordersContext,
  BordersContext,
} from "@/components/providers/BordersProvider/BordersProvider";

// Define a custom hook to use the borders context
export const useBorders = (): IBordersContext => {
  const context = useContext(BordersContext);

  if (!context) {
    throw new Error("useBorders must be used within a BordersProvider");
  }
  return context;
};
