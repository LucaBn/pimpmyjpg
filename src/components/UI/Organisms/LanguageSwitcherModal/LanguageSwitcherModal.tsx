import React, { Dispatch, SetStateAction } from "react";

// Components
import { Button, Modal } from "react-bootstrap";

// Constants
import LanguageSwitcherModalForm from "@/components/UI/Organisms/LanguageSwitcherModal/LanguageSwitcherModalForm";

interface ILanguageSwitcherModal {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const LanguageSwitcherModal: React.FC<ILanguageSwitcherModal> = ({
  show,
  setShow,
}) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} size="sm" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Language</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <LanguageSwitcherModalForm />
        </Modal.Body>
        <Modal.Footer>
          {/* TODO: rewrite these button */}
          <Button variant="primary" onClick={handleClose}>
            Save and close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LanguageSwitcherModal;
