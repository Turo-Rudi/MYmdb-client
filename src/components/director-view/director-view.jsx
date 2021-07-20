import React from 'react';

import './director-view.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (
      <Card bg="light" border="dark">
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text><strong>Bio: </strong>{director.Bio}</Card.Text>
          <Card.Text><strong>Birthday: </strong>{director.Birthday.slice(0, 10)}</Card.Text>
          <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card >
    );
  }
}
