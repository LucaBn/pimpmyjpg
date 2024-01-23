import React, { useState } from "react";

// Components
import IconLanguage from "@/components/UI/Atoms/IconLanguage/IconLanguage";
import LanguageSwitcherModal from "@/components/UI/Organisms/LanguageSwitcher/LanguageSwitcherModal";
import { Button } from "react-bootstrap";

// Typings
import { IImage } from "@/typings/icons";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";

interface ILanguageSwitcher extends IImage {}

const LanguageSwitcher: React.FC<ILanguageSwitcher> = ({ forceColor }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button
        aria-label="Switch language"
        variant="link"
        className={`${CLASS_APP_NAME}-language-switcher rounded-0`}
        onClick={() => setShowModal(true)}
      >
        <IconLanguage forceColor={forceColor} />
      </Button>
      <LanguageSwitcherModal show={showModal} setShow={setShowModal} />
    </>
  );
};

export default LanguageSwitcher;
