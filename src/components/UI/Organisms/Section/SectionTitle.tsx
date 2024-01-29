import React from "react";

// Components
import Title from "@/components/UI/Molecules/Title/Title";

// Typings
import { IGenericComponent } from "@/typings/components";
import { TitleTags } from "@/components/UI/Molecules/Title/typings";

interface SectionTitleProps extends IGenericComponent {}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <Title tag={TitleTags.H2} attributeList={{ className: "mb-3" }}>
      {children}
    </Title>
  );
};

export default SectionTitle;
