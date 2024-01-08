import React from "react";

import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer className="bg-body-tertiary py-4 border-top">
      <Container>
        <Row>
          <Col xs={12} className="mt-4">
            <p>&copy; 2024-2381 pimpmyjpg.com</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4">
            <p>
              Made with ♥ by{" "}
              <a
                href="https://github.com/LucaBn"
                title="Visit LucaBn's GitHub Page"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                LucaBn
              </a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4">
            <h5 className="mb-0">Share</h5>
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
            <a
              href="https://www.buymeacoffee.com/lucabn"
              title="Buy me a coffee"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <img
                src="/assets/img/buy-me-a-coffee.png"
                width={200}
                className="d-block mx-auto"
              />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
