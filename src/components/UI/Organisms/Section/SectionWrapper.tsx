import React from "react";

// Components
import { Row } from "react-bootstrap";

// Typings
import { IGenericComponent } from "@/typings/components";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";

//
interface ISection extends IGenericComponent {}

const SectionWrapper: React.FC<ISection> = ({ children }) => {
  return <Row className={`${CLASS_APP_NAME}--section`}>{children}</Row>;
};

export default SectionWrapper;
