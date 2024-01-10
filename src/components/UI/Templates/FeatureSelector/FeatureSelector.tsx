import React from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";

const FeatureSelector: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12}>
          <h1>{t("feature-selector.title")}</h1>
        </Col>
        <Col xs={12}>
          <p>{t("feature-selector.description")}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default FeatureSelector;
