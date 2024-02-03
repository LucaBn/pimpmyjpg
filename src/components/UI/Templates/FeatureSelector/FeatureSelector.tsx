import React from "react";

// Components
import Section from "@/components/UI/Organisms/Section/Section";
import { Col, Container, Row } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// SEO
import Metatags from "@/components/metatags/Metatags";

const FeatureSelector: React.FC = () => {
  const { i18n, t } = useTranslation("common");
  const { language } = i18n;

  return (
    <>
      <Metatags
        title={t("metatags.HP.title")}
        description={t("metatags.HP.description")}
        keywords={t("metatags.HP.keywords")}
        image="https://www.pimpmyjpg.com/assets/img/meta/meta.jpg" /* TODO: update meta image */
        langUrls={{
          en: "https://www.pimpmyjpg.com/en",
          it: "https://www.pimpmyjpg.com/it",
          jp: "https://www.pimpmyjpg.com/jp",
        }}
      />
      <Container className="py-5">
        <Row>
          <Col xs={12}>
            <h1>{t("feature-selector.title")}</h1>
          </Col>
          <Col xs={12}>
            <p>{t("feature-selector.description")}</p>
          </Col>
        </Row>

        {/* First section */}
        <Section>
          <Col xs={12} md={6}>
            <Section.Image
              src="https://placekitten.com/300/500"
              width={300}
              height={500}
              alt={t("feature-selector.image-compressor.image-alt")}
              fluid
            />
          </Col>
          <Col
            xs={12}
            md={5}
            className="d-flex align-items-center text-md-start"
          >
            <div className="my-4">
              <Section.Title>
                {t("feature-selector.image-compressor.title")}
              </Section.Title>
              <Section.Description>
                {t("feature-selector.image-compressor.description")}
              </Section.Description>
              <Link to={`/${language}/image-compressor`}>
                <Section.Button tabIndex={-1}>
                  {t("feature-selector.image-compressor.cta")}
                </Section.Button>
              </Link>
            </div>
          </Col>
        </Section>

        {/* Second section */}
        <Section>
          <Col xs={12} md={6} className="order-md-last">
            <Section.Image
              src="https://placekitten.com/300/500"
              width={300}
              height={500}
              alt={t("feature-selector.add-filter.image-alt")}
              fluid
            />
          </Col>
          <Col
            xs={12}
            md={{ span: 5, offset: 1 }}
            className="d-flex align-items-center text-md-end"
          >
            <div className="my-4">
              <Section.Title>
                {t("feature-selector.add-filter.title")}
              </Section.Title>
              <Section.Description>
                {t("feature-selector.add-filter.description")}
              </Section.Description>
              <Link to="/">
                <Section.Button tabIndex={-1}>
                  {t("feature-selector.add-filter.cta")}
                </Section.Button>
              </Link>
            </div>
          </Col>
        </Section>

        {/* Third section */}
        <Section>
          <Col xs={12} md={6}>
            <Section.Image
              src="https://placekitten.com/300/500"
              width={300}
              height={500}
              alt={t("feature-selector.add-watermark.image-alt")}
              fluid
            />
          </Col>
          <Col
            xs={12}
            md={5}
            className="d-flex align-items-center text-md-start"
          >
            <div className="my-4">
              <Section.Title>
                {t("feature-selector.add-watermark.title")}
              </Section.Title>
              <Section.Description>
                {t("feature-selector.add-watermark.description")}
              </Section.Description>
              <Link to="/">
                <Section.Button tabIndex={-1}>
                  {t("feature-selector.add-watermark.cta")}
                </Section.Button>
              </Link>
            </div>
          </Col>
        </Section>
      </Container>
    </>
  );
};

export default FeatureSelector;
