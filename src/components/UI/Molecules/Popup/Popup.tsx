import React, { useEffect } from "react";

import { Alert } from "react-bootstrap";

import { Variant } from "react-bootstrap/esm/types";

interface PopupProps {
  show: boolean;
  message: string;
  onClose: () => void;
  variant: Variant;
}

const Popup: React.FC<PopupProps> = ({ show, message, onClose, variant }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <Alert
      variant={variant}
      className="position-fixed bottom-0 end-0 m-3"
      style={{ zIndex: 1060 }}
      dismissible
      onClose={onClose}
    >
      {message}
    </Alert>
  );
};

export default Popup;
