import React, { Dispatch, SetStateAction } from "react";

// Components
import { Button, Modal } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";

// Constants
import OptionsModalForm from "@/components/UI/Organisms/Options/OptionsModalForm";

interface IOptionsModal {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const OptionsModal: React.FC<IOptionsModal> = ({ show, setShow }) => {
  const { t } = useTranslation("common");

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("navbar.options.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <OptionsModalForm />
        </Modal.Body>
        <Modal.Footer>
          {/* TODO: rewrite these button */}
          <Button variant="primary" onClick={handleClose}>
            {t("navbar.options.save-and-close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OptionsModal;
