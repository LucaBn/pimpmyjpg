import React from "react";

// Components
import { Image } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";

// Constants
import { APP_NAME } from "@/constants/app";
import { CLASS_APP_NAME } from "@/constants/html-classes";

interface ILogo {
  height?: number;
  width?: number;
  label?: string;
}

const Logo: React.FC<ILogo> = ({
  height = 100,
  width = 100,
  label = APP_NAME, // Use APP_NAME as a fallback
}) => {
  const { t } = useTranslation("common");

  const logoLabel = label.toUpperCase();
  return (
    <div className={`${CLASS_APP_NAME}__logo position-relative`}>
      <Image
        src="/assets/img/logo.png"
        height={height}
        width={width}
        alt={t("navbar.logo-title")}
        draggable={false}
      />
      <span className={`${CLASS_APP_NAME}__logo-label`}>{logoLabel}</span>
    </div>
  );
};

export default Logo;
