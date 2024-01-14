import React from "react";

// Components
import Section from "@/components/UI/Organisms/Section/Section";
import { Col, Container, Row } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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

      {/* First section */}
      <Section>
        <Col xs={12} md={6}>
          <Section.Image
            src="https://placekitten.com/300/500"
            width={300}
            height={500}
            alt="Immagine 1"
            fluid
          />
        </Col>
        <Col xs={12} md={5} className="d-flex align-items-center text-start">
          <div>
            <Section.Title>Titolo Sezione 1</Section.Title>
            <Section.Description>
              Descrizione Sezione 1 Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </Section.Description>
            <Link to="/">
              <Section.Button>Button</Section.Button>
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
            alt="Immagine 1"
            fluid
          />
        </Col>
        <Col
          xs={12}
          md={{ span: 5, offset: 1 }}
          className="d-flex align-items-center text-end"
        >
          <div>
            <Section.Title>Titolo Sezione 2</Section.Title>
            <Section.Description>
              Descrizione Sezione 2. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </Section.Description>
            <Link to="/">
              <Section.Button>Button</Section.Button>
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
            alt="Immagine 1"
            fluid
          />
        </Col>
        <Col xs={12} md={5} className="d-flex align-items-center text-start">
          <div>
            <Section.Title>Titolo Sezione 3</Section.Title>
            <Section.Description>
              Descrizione Sezione 3 Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </Section.Description>
            <Link to="/">
              <Section.Button>Button</Section.Button>
            </Link>
          </div>
        </Col>
      </Section>
    </Container>
  );
};

export default FeatureSelector;
