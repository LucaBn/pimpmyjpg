import React from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";
import ImageCompressor from "@/components/UI/Organisms/ImageCompressor/ImageCompressor";

// Locales
import { useTranslation } from "react-i18next";

const ImageCompressorTemplate: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12}>
          <h1 className="mt-3">{t("image-compressor.title")}</h1>
        </Col>
        <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
          <p>{t("image-compressor.description")}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          <ImageCompressor />
        </Col>
      </Row>
    </Container>
  );
};

export default ImageCompressorTemplate;
