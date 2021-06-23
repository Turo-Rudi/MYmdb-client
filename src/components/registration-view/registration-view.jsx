import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  function sendForm() {
    alert('Thank you for your registration!');
    let reg = true
    props.regData(reg);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for auth, then call props.onLoggedIn(username) */
    props.onRegister(username);
  };

  return (
    <form className="form">
      <h2>Registration</h2>
      <label className="input">
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label className="input">
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label className="input">
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label className="input">
        Birthday:
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={sendForm}>Register</button>
    </form>
  );
}

RegistrationView.PropTypes = {
  onRegister: PropTypes.func.isRequired
};