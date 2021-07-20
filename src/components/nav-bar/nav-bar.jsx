import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onLoggedOut = this.onLoggedOut.bind(this);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      Username: null,
      user: null,
      movies: []
    });
  }

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
          {/* {!Username && <Link to={`/`}>
            <Button variant="link" className="text-dark">Login</Button>
          </Link>}
          {!Username && <Link to={`/register`}>
            <Button variant="link" className="text-dark">Register</Button>
          </Link>} */}
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

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps)(NavBar);