import React from "react";
import {  Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

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
              <Link to={`/user/${id}`} className="ml-5">
                Posts
              </Link>
              <Link to={`/user/${id}/album`} className="ml-5">
                Albums
              </Link>
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
