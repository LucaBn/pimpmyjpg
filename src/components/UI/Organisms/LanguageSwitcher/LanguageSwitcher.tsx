import React from "react";

// Components
import IconLanguage from "@/components/UI/Atoms/IconLanguage/IconLanguage";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";

const LanguageSwitcher: React.FC = () => {
  return (
    <div
      className={`${CLASS_APP_NAME}-language-switcher`}
      onClick={() => {
        console.log("Click");
      }}
    >
      <IconLanguage />
    </div>
  );
};

export default LanguageSwitcher;
