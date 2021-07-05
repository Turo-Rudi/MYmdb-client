import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import './movie-card.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card bg="light" border="dark">
        <Card.Img variant="top" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="success">More info</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string
    }).isRequired,
    // Actors: PropTypes.shape({
    //   Name: PropTypes.string,
    //   Bio: PropTypes.string
    // }),
    ImageURL: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func
};