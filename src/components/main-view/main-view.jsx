import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavBar } from '../nav-bar/nav-bar';

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
        <Col>
          <NavBar />
        </Col>

        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!Username) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view">Loading!</div>;
            return <MoviesList movies={movies} />
          }} />

          <Route path="/register" render={() => {
            if (Username) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/users/:userId" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view">Loading!</div>;
            if (Username) return <Col>
              <ProfileView onLoggedIn={user => this.onLoggedIn(user)}
                movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!Username) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view">Loading!</div>;
            return <Col md={8}>
              <MovieView FavoriteMovies={user.FavoriteMovies} movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!Username) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view">Loading!</div>;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!Username) return <Col>
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

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);