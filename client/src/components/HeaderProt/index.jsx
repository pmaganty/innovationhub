import React from 'react';
import "../Header/index.css";
import {Navbar, Nav, Container} from "react-bootstrap";

// Header component for logged-in users
function HeaderProt() {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="/home">IHub</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/create">Create</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/myIdeas">My Ideas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderProt;