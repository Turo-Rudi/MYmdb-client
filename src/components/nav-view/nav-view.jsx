import React from 'react';
import { BrowserRouter as Route, Redirect } from "react-router-dom";

import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { Row, Col, Button, Navbar } from 'react-bootstrap';

export class NavView extends React.Component {

  render() {

    return (
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
    );
  }
}

export default NavView;