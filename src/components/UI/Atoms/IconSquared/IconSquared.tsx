import React from "react";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { IImage } from "@/typings/icons";

// Utils
import { getImageColor } from "@/utils/image-color";

interface IIconSquared extends IImage {}

const IconSquared: React.FC<IIconSquared> = ({ forceColor }) => {
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
      stroke-width="2"
      className="icon-squared"
    >
      <rect height="18" width="18" x="3" y="3" />
    </svg>
  );
};

export default IconSquared;
