import React, { useEffect } from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";
import ImageCompressor from "@/components/UI/Organisms/ImageCompressor/ImageCompressor";

// Locales
import { useTranslation } from "react-i18next";

// Constants
import { APP_NAME } from "@/constants/app";

const ImageCompressorTemplate: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;

  useEffect(() => {
    document.title = `${APP_NAME} :: ${t("image-compressor.title")}`;
  }, [language]);

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12}>
          <h1 className="mt-2 mt-sm-3">{t("image-compressor.title")}</h1>
        </Col>
        <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
          <p className="white-space-pre-line">
            {t("image-compressor.description")}
          </p>
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
