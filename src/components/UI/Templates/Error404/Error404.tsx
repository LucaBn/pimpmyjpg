import React from "react";

// Components
import Text from "@/components/UI/Atoms/Text/Text";
import { Col, Container, Row, Image, Button } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Metatags from "@/components/metatags/Metatags";

const Error404: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;

  return (
    <>
      <Metatags
        title={t("metatags.error404.title")}
        description={t("metatags.error404.description")}
        // keywords="parola1, parola2"
        // langUrls={{
        //   en: "https://www.pimpmyjpg.com/en",
        //   it: "https://www.pimpmyjpg.com/it",
        //   jp: "https://www.pimpmyjpg.com/jp",
        // }}
        image="/image.jpg"
      />
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
    </>
  );
};

export default Error404;
