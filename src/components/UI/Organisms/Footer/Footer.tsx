import React from "react";

// Components
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// Locales
import { Trans, useTranslation } from "react-i18next";

// Constants
import { AUTHOR_NAME, WEBSITE_URL } from "@/constants/app";

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
      className="text-white"
      tabIndex={0}
    >
      {authorName}
    </Link>
  );

  return (
    <footer className="bg-dark text-white py-4 border-top">
      <Container>
        <Row>
          <Col xs={12} className="my-4">
            <p className="mb-1">&copy; 2&zwj;024-2381 {WEBSITE_URL}</p>
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
            <p className="d-flex justify-content-center">
              <Link
                to="https://www.buymeacoffee.com/lucabn"
                title={t("buy-me-a-coffee")}
                target="_blank"
                rel="noopener noreferrer nofollow"
                tabIndex={0}
              >
                <Image
                  src="/assets/img/buy-me-a-coffee.png"
                  height={56}
                  width={200}
                  className="d-block mx-auto rounded"
                  alt={t("buy-me-a-coffee")}
                  draggable={false}
                />
              </Link>
            </p>
            <p className="text-center">
              {t("footer.my-address")}
              <br />
              <small>
                ETH 0x7470cf0460d96a857094
                <wbr />
                f748a18669585ea5c185
              </small>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
