import React from "react";

// Components
import { Image } from "react-bootstrap";

// Constants
import { APP_NAME } from "@/constants/app";

interface ILogo {
  height?: number;
  width?: number;
  title?: string;
}

const Logo: React.FC<ILogo> = ({
  height = 100,
  width = 100,
  title = APP_NAME, // Use APP_NAME as a fallback
}) => {
  return (
    <Image
      src={`/assets/img/logo.png`}
      title={title}
      height={height}
      width={width}
    />
  );
};

export default Logo;
