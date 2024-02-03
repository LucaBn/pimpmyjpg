import React from "react";

// Typings
import { IGenericComponent } from "@/typings/components";

interface SectionDescriptionProps extends IGenericComponent {}

const SectionDescription: React.FC<SectionDescriptionProps> = ({
  children,
}) => {
  return <p className={"lh-lg mb-3"}>{children}</p>;
};

export default SectionDescription;
