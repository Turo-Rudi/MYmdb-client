import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import { Link } from "react-router-dom";

import './profile-view.scss';
import { Button, Row, Col, Form } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    this.getUsers(token);
  }

  getUsers(token) {
    axios.get('https://blooming-flowers.herokuapp.com/users${user}', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDelete() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(`https://blooming-flowers.herokuapp.com/users/${user}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert(user + " has been deleted!");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.put(`https://blooming-flowers.herokuapp.com/users/${user}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        console.log(data);
        alert(user + " has been updated!");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { user } = this.props;
    return (
      <Container className="userProfile">
        <Row className="justify-content-md-center">
          <Col md={12}>
            <div className="profile-view">
              <div className="profile-name">
                <span className="label">Username: </span>
                <span className="value">{user.Username}</span>
              </div>
              <div className="profile-email">
                <span className="label">Email: </span>
                <span className="value">{user.Email}</span>
              </div>
              <div className="profile-birthday">
                <span className="label">Birthday: </span>
                <span className="value">{user.Birthday}</span>
              </div>
            </div>

            <Form className="justify-content-md-center mb-30">
              <h2>Update Profile</h2>
              <Form.Group controlId="formUsername">
                <Form.Label className="input">Username</Form.Label>
                <Form.Control type="text" placeholder="Change Username" value={this.state.Username} onChange={e => this.handleChange(e)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label className="input">Password</Form.Label>
                <Form.Control type="text" placeholder="Change Password" value={this.state.Password} onChange={e => this.handleChange(e)} />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label className="input">Email</Form.Label>
                <Form.Control type="text" placeholder="Change Email" value={this.state.Email} onChange={e => this.handleChange(e)} />
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label className="input">Birthday</Form.Label>
                <Form.Control type="text" placeholder="Change Birthday" value={this.state.Birthday} onChange={e => this.handleChange(e)} />
              </Form.Group>

              <Link to={`/users/${this.state.Username}`}>
                <Button variant="success" onClick={e => this.handleUpdate(e)}>
                  Save changes
                </Button>
              </Link>

              <Link to={`/`}>
                <Button variant="secondary">
                  Back to movies
                </Button>
              </Link>

              <Button variant="danger" onClick={e => this.handleDelete()}>
                Delete user
              </Button>

            </Form>

          </Col>
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired
};