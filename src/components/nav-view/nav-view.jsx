import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export class NavView extends React.Component {
  constructor(props) {
    super(props);
    this.onLoggedOut = this.onLoggedOut.bind(this);
    this.onLoggedIn = this.onLoggedIn.bind(this);
    this.state = { isLoggedIn: false };
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      isLoggedIn: false,
      Username: null,
      user: null,
      movies: []
    });
  }

  onLoggedIn(authData) {
    this.setState({
      isLoggedIn: true,
      Username: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { Username } = this.props;
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        {isLoggedIn
          ? <Navbar bg="light" expand="lg">
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
          : <Navbar bg="light" expand="lg">
            <Navbar.Brand className="text-light">
              <Link to={`/`}>
                <Button variant="link" className="text-dark"><strong>MYmdb</strong></Button>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Link to={`/`}>
                <Button variant="link" className="text-dark">Login</Button>
              </Link>
              <Link to={`/register`}>
                <Button variant="link" className="text-dark">Register</Button>
              </Link>
            </Navbar.Collapse>
          </Navbar>
        }
      </div>
    );
  }
}

export default NavView;