import React from "react";

// Components
import { Image } from "react-bootstrap";
import Text from "@/components/UI/Atoms/Text/Text";

// Constants
import { APP_NAME } from "@/constants/app";
import { CLASS_APP_NAME } from "@/constants/html-classes";

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
  const logoLabel = title.toUpperCase();
  return (
    <div className={`${CLASS_APP_NAME}__logo position-relative`}>
      <Image
        src={`/assets/img/logo.png`}
        title={title}
        height={height}
        width={width}
      />
      <Text
        tag="span"
        attributeList={{ className: `${CLASS_APP_NAME}__logo-label` }}
      >
        {logoLabel}
      </Text>
    </div>
  );
};

export default Logo;
