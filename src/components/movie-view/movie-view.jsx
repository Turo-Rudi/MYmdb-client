import React from 'react';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Card bg="light" border="dark">
        <Card.Img variant="top" src={movie.ImageURL} />

        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Text>{movie.Featured}</Card.Text>
          <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}