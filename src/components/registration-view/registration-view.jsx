import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for auth, then call props.onLoggedIn(username) */
    props.onRegister(username);
  };

  return (
    <Form className="form">
      <FormGroup>
        <h2>Registration</h2>
        <FormLabel className="input">Username</FormLabel>
        <FormControl type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      </FormGroup>

      <FormGroup>
        <FormLabel className="input">Password</FormLabel>
        <FormControl type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </FormGroup>

      <FormGroup>
        <FormLabel className="input">Email</FormLabel>
        <FormControl type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </FormGroup>

      <FormGroup>
        <FormLabel className="input">Birthday</FormLabel>
        <FormControl type="date" placeholder="Birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </FormGroup>

      <div className="d-grid gap-2">
        <Button variant="success" active type="submit" onClick={handleSubmit}>Register</Button>
        <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};