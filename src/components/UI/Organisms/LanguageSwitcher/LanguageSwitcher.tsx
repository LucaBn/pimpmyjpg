import React, { useState } from "react";

// Components
import IconLanguage from "@/components/UI/Atoms/IconLanguage/IconLanguage";
import LanguageSwitcherModal from "@/components/UI/Organisms/LanguageSwitcherModal/LanguageSwitcherModal";
import { Button } from "react-bootstrap";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";

const LanguageSwitcher: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button
        aria-label="Switch language"
        variant="link"
        className={`${CLASS_APP_NAME}-language-switcher rounded-0`}
        onClick={() => setShowModal(true)}
      >
        <IconLanguage />
      </Button>
      <LanguageSwitcherModal show={showModal} setShow={setShowModal} />
    </>
  );
};

export default LanguageSwitcher;
