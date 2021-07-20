import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let setIsValid = formValidation();
    if (setIsValid) {
      axios.post('https://blooming-flowers.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); //_self opens page in current tab
          alert("Registration successful!");
        })
        .catch(e => {
          console.log('Could not register user')
        });
      console.log(username, password, email, birthday);
      props.onRegister(username, password, email, birthday);
    };
  }

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    const birthdayError = {};
    let isValid = true;
    if (username.trim().length < 5) {
      usernameError.usernameInvalid = "Username must contain at least 5 characters";
      isValid = false;
    }
    else if (password.trim().length < 4) {
      passwordError.passwordInvalid = "Password must be at least 4 characters";
      isValid = false;
    }
    else if (!email.includes(".") || !email.includes("@")) {
      emailError.emailInvalid = "This is not a valid email address";
      isValid = false;
    }
    else if (birthday === '') {
      birthdayError.birthdayInvalid = "Birthday cannot be empty";
      isValid = false;
    }
    return isValid;
  };

  return (
    <Form className="form">
      <Form.Group >
        <h2>Registration</h2>
        <Form.Label className="input">Username</Form.Label>
        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required isInvalid />
        <Form.Control.Feedback type="invalid">Please enter your username</Form.Control.Feedback>
      </Form.Group>

      <Form.Group >
        <Form.Label className="input">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required isInvalid />
        <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>
        <Form.Text className="text-muted">We'll never share your password with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label className="input">Email</Form.Label>
        <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required isInvalid />
        <Form.Control.Feedback type="invalid">Please enter your email address</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label className="input">Birthday</Form.Label>
        <Form.Control type="date" placeholder="Birthday" value={birthday} onChange={e => setBirthday(e.target.value)} required isInvalid />
        <Form.Control.Feedback type="invalid">Please enter your birthday</Form.Control.Feedback>
      </Form.Group>

      <Button variant="success" active type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};