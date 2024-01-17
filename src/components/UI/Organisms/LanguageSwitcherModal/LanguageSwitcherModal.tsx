import React, { Dispatch, SetStateAction } from "react";

// Components
import FlagEn from "@/components/UI/Atoms/FlagEn/FlagEn";
import FlagIt from "@/components/UI/Atoms/FlagIt/FlagIt";
import FlagJp from "@/components/UI/Atoms/FlagJp/FlagJp";
import { Button, Modal } from "react-bootstrap";

// Locales
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Utils
import { generateClassNameValue } from "@/utils/html-classes";

// Typings
import { LanguageList } from "@/typings/i18next";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";

interface ILanguageSwitcherModal {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const LanguageSwitcherModal: React.FC<ILanguageSwitcherModal> = ({
  show,
  setShow,
}) => {
  const handleClose = () => setShow(false);

  const { i18n } = useTranslation("common");
  const { language, changeLanguage } = i18n;

  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguage = (language: LanguageList) => {
    const splitLocation = location.pathname.split("/");
    splitLocation[1] = language;
    const newLocation = splitLocation.join("/");

    changeLanguage(language);
    navigate(newLocation);
  };

  const flagContainerClassList = (flagLanguage: LanguageList) => {
    const classList = [`${CLASS_APP_NAME}-flag`, `position-relative`, `ps-4`];

    if (flagLanguage === language) {
      classList.push(`${CLASS_APP_NAME}-flag--active`);
    }

    return generateClassNameValue(classList);
  };

  return (
    <>
      <Modal show={show} size="sm" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Language</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          {/* TODO: Create a component for single flags */}
          <div
            className={flagContainerClassList(LanguageList.En)}
            onClick={() => handleLanguage(LanguageList.En)}
          >
            <FlagEn />
          </div>
          <div
            className={flagContainerClassList(LanguageList.It)}
            onClick={() => handleLanguage(LanguageList.It)}
          >
            <FlagIt />
          </div>
          <div
            className={flagContainerClassList(LanguageList.Jp)}
            onClick={() => handleLanguage(LanguageList.Jp)}
          >
            <FlagJp />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LanguageSwitcherModal;
