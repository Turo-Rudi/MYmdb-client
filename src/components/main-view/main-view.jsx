import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import './main-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://blooming-flowers.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  // toggleRegister = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     register: !this.state.register
  //   })
  // }

  render() {
    const { movies, user } = this.state;

    //    if (register) return <RegistrationView onRegister={(register) => this.onRegister(register)} toggleRegister={this.toggleRegister} />;

    return (
      <Router>
        <Navbar bg="dark">
          <Navbar.Brand className="text-light">
            <Link to={`/`}>
              <Button variant="link" className="text-light"><strong>MYmdb</strong></Button>
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Link to={`/`}>
              <Button variant="link" className="text-light">Login</Button>
            </Link>
            <Link to={`/register`}>
              <Button variant="link" className="text-light">Register</Button>
            </Link>
            <Link to={`/users/${user}`}>
              <Button variant="link" className="text-light">Profile</Button>
            </Link>
            <Link to={`/`}>
              <Button variant="link" className="text-light">Movies</Button>
            </Link>
            <Link to={`/`}>
              <Button variant="link" className="text-light" onClick={() => { this.onLoggedOut() }}>Logout</Button>
            </Link>
          </Navbar.Collapse>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view">Loading!</div>;
            return movies.map(m => (
              <Col md={3} key={m._id} >
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/users/:userId" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view">Loading!</div>;
            if (user) return <Col>
              <ProfileView onLoggedIn={user => this.onLoggedIn(user)}
                movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view">Loading!</div>;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view">Loading!</div>;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view">Loading!</div>;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}

export default MainView