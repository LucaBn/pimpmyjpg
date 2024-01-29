import React, { Dispatch, SetStateAction } from "react";

// Components
import { Button, Modal } from "react-bootstrap";

// Constants
import OptionsModalForm from "@/components/UI/Organisms/Options/OptionsModalForm";

interface IOptionsModal {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const OptionsModal: React.FC<IOptionsModal> = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Options</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <OptionsModalForm />
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

export default OptionsModal;
