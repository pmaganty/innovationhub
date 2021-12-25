import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">IHub</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" 
        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
        aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="#">Create</a>
            <a className="nav-item nav-link" href="#">Search</a>
            <a className="nav-item nav-link disabled" href="#">Sign In</a>
          </div> 
        </div>
        
      </nav>
    </div>
  );
}

export default Header;