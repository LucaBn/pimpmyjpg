import React from "react";

// Components
import IconGear from "@/components/UI/Atoms/IconGear/IconGear";
import { Button } from "react-bootstrap";

// Typings
import { IImage } from "@/typings/icons";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";

interface IOptions extends IImage {}

const Options: React.FC<IOptions> = ({ forceColor }) => {
  return (
    <Button
      aria-label="Options"
      variant="link"
      className={`${CLASS_APP_NAME}-options rounded-0`}
    >
      <IconGear forceColor={forceColor} />
    </Button>
  );
};

export default Options;
