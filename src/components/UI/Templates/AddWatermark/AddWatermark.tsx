import React from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";
import AddWatermark from "@/components/UI/Organisms/AddWatermark/AddWatermark";

// Locales
import { useTranslation } from "react-i18next";

const AddWatermarkTemplate: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12}>
          <h1 className="mt-2 mt-sm-3">{t("add-watermark.title")}</h1>
        </Col>
        <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
          <p className="white-space-pre-line">
            {t("add-watermark.description")}
          </p>
        </Col>
      </Row>
      <AddWatermark />
    </Container>
  );
};

export default AddWatermarkTemplate;
