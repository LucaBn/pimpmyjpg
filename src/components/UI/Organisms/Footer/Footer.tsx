import React from "react";

// Components
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import IconFacebook from "@/components/UI/Atoms/IconFacebook/IconFacebook";
import IconTwitter from "@/components/UI/Atoms/IconTwitter/IconTwitter";
import IconWhatsapp from "@/components/UI/Atoms/IconWhatsapp/IconWhatsapp";
import IconTelegram from "@/components/UI/Atoms/IconTelegram/IconTelegram";

// Locales
import { Trans, useTranslation } from "react-i18next";

// Utils
import {
  shareOnFacebook,
  shareOnTelegram,
  shareOnTwitter,
  shareOnWhatsapp,
} from "@/utils/share";

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
      className="link-primary"
    >
      {authorName}
    </Link>
  );

  const urlToShare = `www.${WEBSITE_URL}`;

  return (
    <footer className="bg-dark text-white py-4 border-top">
      <Container>
        <Row>
          <Col xs={12} className="mt-4">
            <p>&copy; 2&zwj;024-2381 {WEBSITE_URL}</p>
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
            <ul className="footer__social-list list-unstyled d-flex justify-content-center gap-2">
              {/* TODO: Change with icons */}
              <li>
                <Button
                  onClick={() => shareOnFacebook(urlToShare)}
                  aria-label={t("footer.share-on-facebook")}
                  variant="link"
                >
                  <IconFacebook />
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => shareOnTwitter(urlToShare)}
                  aria-label={t("footer.share-on-twitter")}
                  variant="link"
                >
                  <IconTwitter />
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => shareOnWhatsapp(urlToShare)}
                  aria-label={t("footer.share-on-whatsapp")}
                  variant="link"
                >
                  <IconWhatsapp />
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => shareOnTelegram(urlToShare)}
                  aria-label={t("footer.share-on-telegram")}
                  variant="link"
                >
                  <IconTelegram />
                </Button>
              </li>
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
