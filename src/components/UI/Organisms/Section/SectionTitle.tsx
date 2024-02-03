import React from "react";

// Typings
import { IGenericComponent } from "@/typings/components";

interface SectionTitleProps extends IGenericComponent {}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return <h2 className={"mb-3"}>{children}</h2>;
};

export default SectionTitle;
