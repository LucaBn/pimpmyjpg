import React, { useEffect } from "react";

// Components
import Section from "@/components/UI/Organisms/Section/Section";
import { Col, Container, Row } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Constants
import { APP_NAME } from "@/constants/app";

const FeatureSelector: React.FC = () => {
  const { i18n, t } = useTranslation("common");
  const { language } = i18n;

  useEffect(() => {
    document.title = APP_NAME;
  }, [language]);

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12}>
          <h1 className="mt-2 mt-sm-3">{t("feature-selector.title")}</h1>
        </Col>
        <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
          <p className="white-space-pre-line lh-lg">
            {t("feature-selector.description")}
          </p>
        </Col>
      </Row>

      {/* First section */}
      <Section>
        <Col xs={12} md={6} className="position-relative">
          <div className="feature-image__bg feature-image__bg--compressor rounded"></div>
          <picture>
            <source
              srcSet="/assets/img/chars/compressor.webp"
              type="image/webp"
            />
            <Section.Image
              src="/assets/img/chars/compressor.png"
              className="position-relative feature-image__char"
              width={450}
              height={600}
              alt={t("feature-selector.image-compressor.image-alt")}
              fluid
              draggable={false}
              // loading="lazy" // Don't apply loading="lazy" to the very first image!
            />
          </picture>
        </Col>
        <Col xs={12} md={5} className="d-flex align-items-center text-md-start">
          <div className="mt-2 mt-md-4 mb-4">
            <Section.Title>
              {t("feature-selector.image-compressor.title")}
            </Section.Title>
            <Section.Description>
              {t("feature-selector.image-compressor.description")}
            </Section.Description>
            <Link to={`/${language}/image-compressor`}>
              <Section.Button tabIndex={-1} variant="dark" className="px-4">
                {t("feature-selector.image-compressor.cta")}
              </Section.Button>
            </Link>
          </div>
        </Col>
      </Section>

      {/* Second section */}
      <Section>
        <Col xs={12} md={6} className="position-relative order-md-last">
          <div className="feature-image__bg feature-image__bg--filter rounded"></div>
          <picture>
            <source srcSet="/assets/img/chars/filter.webp" type="image/webp" />
            <Section.Image
              src="/assets/img/chars/filter.png"
              className="position-relative feature-image__char"
              width={450}
              height={600}
              alt={t("feature-selector.add-filter.image-alt")}
              fluid
              draggable={false}
              loading="lazy"
            />
          </picture>
        </Col>
        <Col
          xs={12}
          md={{ span: 5, offset: 1 }}
          className="d-flex align-items-center text-md-end"
        >
          <div className="mt-2 mt-md-4 mb-4">
            <Section.Title>
              {t("feature-selector.add-filter.title")}
            </Section.Title>
            <Section.Description>
              {t("feature-selector.add-filter.description")}
            </Section.Description>
            <Link to="/">
              <Section.Button tabIndex={-1} variant="dark" className="px-4">
                {t("feature-selector.add-filter.cta")}
              </Section.Button>
            </Link>
          </div>
        </Col>
      </Section>

      {/* Third section */}
      <Section>
        <Col xs={12} md={6} className="position-relative">
          <div className="feature-image__bg feature-image__bg--watermark rounded"></div>
          <picture>
            <source
              srcSet="/assets/img/chars/watermark.webp"
              type="image/webp"
            />
            <Section.Image
              src="/assets/img/chars/watermark.png"
              className="position-relative feature-image__char"
              width={450}
              height={600}
              alt={t("feature-selector.add-watermark.image-alt")}
              fluid
              draggable={false}
              loading="lazy"
            />
          </picture>
        </Col>
        <Col xs={12} md={5} className="d-flex align-items-center text-md-start">
          <div className="mt-2 mt-md-4 mb-4">
            <Section.Title>
              {t("feature-selector.add-watermark.title")}
            </Section.Title>
            <Section.Description>
              {t("feature-selector.add-watermark.description")}
            </Section.Description>
            <Link to="/">
              <Section.Button tabIndex={-1} variant="dark" className="px-4">
                {t("feature-selector.add-watermark.cta")}
              </Section.Button>
            </Link>
          </div>
        </Col>
      </Section>
    </Container>
  );
};

export default FeatureSelector;
