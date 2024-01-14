import React from "react";

// Components
import { Image } from "react-bootstrap";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Constants
import { Themes } from "@/constants/themes";
import { APP_NAME } from "@/constants/app";

interface ILogo {
  height?: number;
  width?: number;
}

const Logo: React.FC<ILogo> = ({ height = 100, width = 100 }) => {
  const { theme } = useTheme();

  const logoUrl = theme === Themes.Dark ? "logo-white" : "logo-black";

  return (
    <Image
      src={`/assets/img/${logoUrl}.png`}
      title={APP_NAME}
      height={height}
      width={width}
    />
  );
};

export default Logo;
