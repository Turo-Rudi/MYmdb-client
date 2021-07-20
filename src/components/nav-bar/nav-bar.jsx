import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class NavBar extends React.Component {

  render() {
    const { Username } = this.props;

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="text-light">
          <Link to={`/`}>
            <Button variant="link" className="text-dark"><strong>MYmdb</strong></Button>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Link to={`/users/${Username}`}>
            <Button variant="link" className="text-dark">Profile</Button>
          </Link>
          <Link to={`/`}>
            <Button variant="link" className="text-dark">Movies</Button>
          </Link>
          <Link to={`/`}>
            <Button variant="link" className="text-dark" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar