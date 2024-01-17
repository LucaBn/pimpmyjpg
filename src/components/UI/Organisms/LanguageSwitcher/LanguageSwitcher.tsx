import React, { useState } from "react";

// Components
import IconLanguage from "@/components/UI/Atoms/IconLanguage/IconLanguage";
import LanguageSwitcherModal from "@/components/UI/Organisms/LanguageSwitcherModal/LanguageSwitcherModal";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";

const LanguageSwitcher: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div
        className={`${CLASS_APP_NAME}-language-switcher`}
        onClick={() => setShowModal(true)}
      >
        <IconLanguage />
      </div>
      <LanguageSwitcherModal show={showModal} setShow={setShowModal} />
    </>
  );
};

export default LanguageSwitcher;
