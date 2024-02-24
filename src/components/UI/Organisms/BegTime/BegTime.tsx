import React, { Dispatch, SetStateAction } from "react";

// Components
import { Button, Image, Modal } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IBegTime {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const BegTime: React.FC<IBegTime> = ({ show, setShow }) => {
  const { t } = useTranslation("common");

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("beg-time.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <p className="white-space-pre-line">{t("beg-time.description")}</p>
          <Link
            to="https://www.buymeacoffee.com/lucabn"
            title={t("buy-me-a-coffee")}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="d-contents"
          >
            <Image
              src="/assets/img/buy-me-a-coffee.png"
              height={56}
              width={200}
              className="d-block mx-auto rounded"
              alt={t("buy-me-a-coffee")}
            />
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {t("beg-time.cta")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BegTime;
