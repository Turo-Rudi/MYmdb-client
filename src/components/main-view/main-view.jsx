import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavView } from '../nav-view/nav-view';

import './main-view.scss';
import { Row, Col, Button, Navbar } from 'react-bootstrap';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
      Username: "",
    };
  }

  getMovies(token) {
    axios.get('https://blooming-flowers.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    const Username = localStorage.getItem("user");
    axios.get(`https://blooming-flowers.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        Username: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
    this.getUser(accessToken);
  }

  onLoggedIn(authData) {
    this.setState({
      Username: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      Username: null
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  render() {
    const { Username } = this.state;
    let { movies, user } = this.props;

    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand className="text-light">
            <Link to={`/`}>
              <Button variant="link" className="text-dark"><strong>MYmdb</strong></Button>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            {!Username && <Link to={`/`}>
              <Button variant="link" className="text-dark">Login</Button>
            </Link>}
            {!Username && <Link to={`/register`}>
              <Button variant="link" className="text-dark">Register</Button>
            </Link>}
            {Username && <Link to={`/users/${Username}`}>
              <Button variant="link" className="text-dark">Profile</Button>
            </Link>}
            {Username && <Link to={`/`}>
              <Button variant="link" className="text-dark">Movies</Button>
            </Link>}
            {Username && <Link to={`/`}>
              <Button variant="link" className="text-dark" onClick={() => { this.onLoggedOut() }}>Logout</Button>
            </Link>}
            {Username && <Navbar.Text className="text-dark">
              Signed in as: <span className="text-dark">{Username}</span>
            </Navbar.Text>}
          </Navbar.Collapse>
        </Navbar>

        <Row>
          <Col>
            <NavView />
          </Col>
        </Row>

      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);