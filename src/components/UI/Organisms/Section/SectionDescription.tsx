import React from "react";

// Components
import Text from "@/components/UI/Atoms/Text/Text";

// Typings
import { IGenericComponent } from "@/typings/components";

interface SectionDescriptionProps extends IGenericComponent {}

const SectionDescription: React.FC<SectionDescriptionProps> = ({
  children,
}) => {
  return (
    <Text tag="p" attributeList={{ className: "lh-lg mb-3" }}>
      {children}
    </Text>
  );
};

export default SectionDescription;
