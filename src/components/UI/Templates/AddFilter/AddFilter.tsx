import React from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";
import AddFilter from "@/components/UI/Organisms/AddFilter/AddFilter";

// Locales
import { useTranslation } from "react-i18next";

const AddFilterTemplate: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12}>
          <h1 className="mt-2 mt-sm-3">{t("add-filter.title")}</h1>
        </Col>
        <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
          <p className="white-space-pre-line">{t("add-filter.description")}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          <AddFilter />
        </Col>
      </Row>
    </Container>
  );
};

export default AddFilterTemplate;
