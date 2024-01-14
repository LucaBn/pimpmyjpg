import React from "react";

// Components
import Text from "@/components/UI/Atoms/Text/Text";

// Typings
import { IGenericComponent } from "@/typings/components";
import { TitleTags } from "@/components/UI/Molecules/Title/typings";

type IntrinsicElement = keyof JSX.IntrinsicElements;

export interface ITitle extends IGenericComponent {
  tag?: TitleTags;
}

const Title: React.FC<ITitle> = ({
  children,
  tag = TitleTags.H1,
  attributeList = {},
  eventList = {},
}) => {
  return (
    <Text
      tag={tag as IntrinsicElement}
      attributeList={attributeList}
      eventList={eventList}
    >
      {children}
    </Text>
  );
};

export default Title;
