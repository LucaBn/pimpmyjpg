import React from "react";

// Components
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// Locales
import { Trans, useTranslation } from "react-i18next";

// Constants
import { AUTHOR_NAME } from "@/constants/app";

const Footer: React.FC = () => {
  const { t } = useTranslation("common");

  const authorName: string = AUTHOR_NAME;
  const authorLink: string = "https://github.com/LucaBn";
  const authorLinkTitle: string = t("footer.made-by-title", {
    author: authorName,
  });
  const authorLinkComponent: JSX.Element = (
    <Link
      to={authorLink}
      title={authorLinkTitle}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="link-primary"
    >
      {authorName}
    </Link>
  );

  return (
    <footer className="bg-dark text-white py-4 border-top">
      <Container>
        <Row>
          <Col xs={12} className="mt-4">
            <p>&copy; 2&zwj;024-2381 pimpmyjpg.com</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4">
            <p>
              <Trans
                i18nKey="footer.made-by"
                t={t}
                components={{
                  authorLink: authorLinkComponent,
                }}
                values={{ authorName: authorName }}
              />
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4">
            <p className="mb-0">{t("footer.share")}</p>
            <ul className="list-unstyled d-flex justify-content-center gap-2">
              {/* TODO: Change with icons */}
              <li>Facebook</li>
              <li>VK</li>
              <li>X</li>
              <li>Whatsapp</li>
              <li>Telegram</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4">
            <p>
              <Link
                to="https://www.buymeacoffee.com/lucabn"
                title={t("footer.buy-me-a-coffee")}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="footer__buy-me-a-coffee-link"
              >
                <Image
                  src="/assets/img/buy-me-a-coffee.png"
                  width={200}
                  className="d-block mx-auto"
                  alt={t("footer.buy-me-a-coffee")}
                />
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
