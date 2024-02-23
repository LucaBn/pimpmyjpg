import React, { useEffect } from "react";

// Components
import { Col, Container, Row, Image, Button } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Constants
import { APP_NAME } from "@/constants/app";

const Error404: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;

  useEffect(() => {
    document.title = `${APP_NAME} :: ${t("error-404.title")}`;
  }, [language]);

  return (
    <>
      <Container className="py-5">
        <Row className="mt-4">
          <Col xs={12}>
            <h1 className="mt-2 mt-sm-3">{t("error-404.title")}</h1>
            <p>{t("error-404.description")}</p>
          </Col>
          <Col xs={12}>
            <Image
              src="/assets/img/404.png"
              title={t("error-404.title")}
              height={360}
              width={512}
              className="mw-100 h-auto"
            />
          </Col>
          <Col xs={12} className="mt-4">
            <Link to={`/${language}`}>
              <Button>{t("error-404.goToHP")}</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Error404;
