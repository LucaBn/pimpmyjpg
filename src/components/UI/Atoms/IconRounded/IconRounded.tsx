import React from "react";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { IImage } from "@/typings/icons";

// Utils
import { getImageColor } from "@/utils/image-color";

interface IIconRounded extends IImage {}

const IconRounded: React.FC<IIconRounded> = ({ forceColor }) => {
  const { theme } = useTheme();

  const iconColor = getImageColor(theme, forceColor);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke={iconColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon-rounded"
    >
      <rect height="18" rx="6" ry="6" width="18" x="3" y="3" />
    </svg>
  );
};

export default IconRounded;
