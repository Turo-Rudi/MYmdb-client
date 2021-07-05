import React from 'react';
import axios from "axios";

import { Link } from "react-router-dom";

import './movie-view.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieView extends React.Component {

  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post(`https://blooming-flowers.herokuapp.com/users/${user}` + "/movies/" +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(this.props.movie.Title + " has been added to your favorites!");
      })
  }

  handleRemove() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(`https://blooming-flowers.herokuapp.com/users/${user}` + "/movies/" +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(this.props.movie.Title + " has been removed from your favorites!");
      })
  }

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Card bg="light" border="dark">
        <Card.Img variant="top" src={movie.ImageURL} />

        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Text>{movie.Featured}</Card.Text>

          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="success">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="success">Genre</Button>
          </Link>

          <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>

        <Card.Footer>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-success" onClick={() => this.handleAdd(movie)}>Add to favorites</Button>
          </Link>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-danger" onClick={() => this.handleRemove(movie)}>Remove from favorites</Button>
          </Link>
        </Card.Footer>

      </Card>
    );
  }
}