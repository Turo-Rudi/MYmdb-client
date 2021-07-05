import React from 'react';

import './genre-view.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    return (
      <Card bg="light" border="dark">
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text><strong>Description: </strong>{genre.Description}</Card.Text>
          <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}