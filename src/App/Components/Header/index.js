import React from "react";
import {  Navbar, Nav } from "react-bootstrap";

const Header = props => {
  const { id } = props.match.params;
  // const {path} = props.match
  return (
    <div className="mb-3">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand to="/" href="/">React-Test</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {id ? (
            <Nav className="mr-auto">
              <Nav.Link to={`/user/${id}`} href={`/user/${id}`}>
                Posts
              </Nav.Link>
              <Nav.Link to={`/user/${id}/album`} href={`/user/${id}/album`}>
                Albums
              </Nav.Link>
            </Nav>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
