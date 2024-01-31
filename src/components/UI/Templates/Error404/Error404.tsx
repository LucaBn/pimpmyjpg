import React from "react";

// Components
import Text from "@/components/UI/Atoms/Text/Text";
import { Col, Container, Row, Image, Button } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Error404: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;

  return (
    <Container className="py-5">
      <Row className="mt-4">
        <Col xs={12}>
          <Text tag="h1">{t("error404.title")}</Text>
          <Text tag="p">{t("error404.description")}</Text>
        </Col>
        <Col xs={12}>
          <Image
            src={`/assets/img/404.png`}
            title={t("error404.title")}
            height={360}
            width={512}
            className="mw-100 h-auto"
          />
        </Col>
        <Col xs={12} className="mt-4">
          <Link to={`/${language}`}>
            <Button>{t("error404.goToHP")}</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
