import React from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";
import ImageCompressor from "@/components/UI/Organisms/ImageCompressor/ImageCompressor";

// Locales
import { useTranslation } from "react-i18next";

// SEO
import Metatags from "@/components/metatags/Metatags";

const ImageCompressorTemplate: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Metatags
        title={t("metatags.image-compressor.title")}
        description={t("metatags.image-compressor.description")}
        keywords={t("metatags.image-compressor.keywords")}
        image="https://www.pimpmyjpg.com/assets/img/meta/meta.jpg" /* TODO: update meta image */
        langUrls={{
          en: "https://www.pimpmyjpg.com/en/image-compressor",
          it: "https://www.pimpmyjpg.com/it/image-compressor",
          ja: "https://www.pimpmyjpg.com/ja/image-compressor",
        }}
      />
      <Container className="py-5">
        <Row>
          <Col xs={12}>
            <h1>{t("image-compressor.title")}</h1>
          </Col>
          <Col xs={12}>
            <p>{t("image-compressor.description")}</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12}>
            <ImageCompressor />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ImageCompressorTemplate;
