import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://blooming-flowers.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('User cannot be found')
      });
  };

  return (
    <Form className="form">
      <Form.Group controlId="formUsername">
        <h2>Login</h2>
        <Form.Label className="input">Username</Form.Label>
        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} isInvalid />
        <Form.Control.Feedback type="invalid">Please enter your username</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="input">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} isInvalid />
        <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>
        <Form.Text className="text-muted">We'll never share your password with anyone else.</Form.Text>
      </Form.Group>

      <Button variant="success" type="submit" onClick={handleSubmit}>
        Login
      </Button>
      <hr />
      <h6>Don't have an account yet?</h6>
      <Link to={`/register`}>
        <Button variant="secondary" className="text-light">Register</Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func,
};
