import React, { useState, useEffect, useRef } from "react";

// Components
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ThemeToggle from "@/components/UI/Organisms/ThemeToggle/ThemeToggle";
import Logo from "@/components/UI/Molecules/Logo/Logo";

// Locales
import { useTranslation } from "react-i18next";

const NavbarComponent: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const { i18n } = useTranslation("common");
  const { language } = i18n;

  const navbarRef = useRef<HTMLDivElement>(null); // TODO: fix outsideClick event when click on logo

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="bg-body-tertiary border-bottom"
      expanded={expanded}
      ref={navbarRef as React.RefObject<HTMLDivElement>}
    >
      <Container>
        <LinkContainer to={`/${language}`}>
          <Navbar.Brand onClick={() => setExpanded(false)} className="py-0">
            <Logo height={35} width={200} />
          </Navbar.Brand>
        </LinkContainer>
        <Nav.Item className="d-block mx-auto d-lg-none ms-auto me-3">
          <ThemeToggle />
        </Nav.Item>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => {
            setExpanded((prevValue) => !prevValue);
          }}
        />
        <Navbar.Collapse onClick={() => setExpanded(false)}>
          <Nav className="ms-auto">
            <Nav.Item className="d-block mx-auto d-none d-lg-block py-2 me-3">
              <ThemeToggle />
            </Nav.Item>
            <LinkContainer to={`/${language}/image-compressor`}>
              <Nav.Link>Image Compressor</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
