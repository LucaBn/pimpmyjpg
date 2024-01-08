import React, { useState, useEffect, useRef } from "react";

// Components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import ThemeToggle from "@/components/UI/Organisms/ThemeToggle/ThemeToggle";

// Constants
import { APP_NAME } from "@/constants/app";

const NavbarComponent: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

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

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="bg-body-tertiary border-bottom"
      expanded={expanded}
      ref={navbarRef as React.RefObject<HTMLDivElement>}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>{APP_NAME}</Navbar.Brand>
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
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Item className="d-block mx-auto d-none d-lg-block py-2 me-3">
              <ThemeToggle />
            </Nav.Item>
            <LinkContainer to="/image-compressor">
              <Nav.Link>Image Compressor</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
