import React, { useState, useEffect, useRef } from "react";

// Components
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LanguageSwitcher from "@/components/UI/Organisms/LanguageSwitcher/LanguageSwitcher";
import ThemeToggle from "@/components/UI/Organisms/ThemeToggle/ThemeToggle";
import Logo from "@/components/UI/Molecules/Logo/Logo";

// Locales
import { useTranslation } from "react-i18next";

const NavbarComponent: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const { i18n, t } = useTranslation("common");
  const { language } = i18n;

  const navbarRef = useRef<HTMLDivElement>(null);

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

  const toggleNavbarDropdownStatus = () => {
    setExpanded((prevValue) => !prevValue);
  };
  const closeNavbarDropdown = () => {
    setExpanded(false);
  };

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
          <Navbar.Brand onClick={closeNavbarDropdown} className="py-0">
            <Logo height={35} width={200} title={t("navbar.logo-title")} />
          </Navbar.Brand>
        </LinkContainer>
        <Nav.Item className="d-lg-none d-flex align-items-center ms-auto me-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </Nav.Item>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleNavbarDropdownStatus}
        />
        <Navbar.Collapse onClick={closeNavbarDropdown}>
          <Nav className="ms-auto">
            <Nav.Item className="d-none d-lg-flex align-items-center mx-auto me-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </Nav.Item>
            <LinkContainer to={`/${language}/image-compressor`}>
              <Nav.Link>{t("navbar.links.image-compressor")}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={`/${language}/add-filter`}>
              <Nav.Link>{t("navbar.links.add-filter")}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={`/${language}/add-watermark`}>
              <Nav.Link>{t("navbar.links.add-watermark")}</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
