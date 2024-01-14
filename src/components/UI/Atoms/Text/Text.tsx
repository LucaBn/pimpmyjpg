import React from "react";

import { IGenericComponent } from "@/typings/components";

type IntrinsicElement = keyof JSX.IntrinsicElements;

export interface IText extends IGenericComponent {
  tag?: IntrinsicElement;
}

const Text: React.FC<IText> = ({
  children,
  tag = "p",
  attributeList = {},
  eventList = {},
}) => {
  const CustomTag = `${tag}` as keyof JSX.IntrinsicElements;

  return (
    <CustomTag {...attributeList} {...eventList}>
      {children}
    </CustomTag>
  );
};

export default Text;
