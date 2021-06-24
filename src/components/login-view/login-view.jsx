import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for auth, then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Form>
      <FormGroup controlId="formBasicUsername">
        <h2>Login</h2>
        <FormLabel>Username</FormLabel>
        <FormControl type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      </FormGroup>

      <FormGroup className="mb-3" controlId="formBasicPassword">
        <FormLabel>Password</FormLabel>
        <FormControl type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Form.Text className="text-muted">We'll never share your password with anyone else.</Form.Text>
      </FormGroup>

      <div className="d-grid gap-2">
        <Button variant="success" active type="submit" onClick={handleSubmit}>
          Login
        </Button>

        <Button variant="success" type="submit" onClick={props.toggleRegister}>
          Register
        </Button>
      </div>
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
