import React from 'react';
import "./index.css";
import {Navbar, Nav, Container} from "react-bootstrap";


function Header() {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="/">IHub</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/auth/google">Sign In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;