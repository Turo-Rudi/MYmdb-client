import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import { Link } from "react-router-dom";

import './profile-view.scss';
import { Button, Card, Row, Col, Form, Container } from 'react-bootstrap';

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
    };
  }

  componentDidMount() {

    this.getUser(token);
  }

  removeFavorite(movie) {
    const url = `https://blooming-flowers.herokuapp.com/users/${user}/movies/${movie._id}`
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
        alert(movie.Title + " has been removed from your Favorites.");
      });
  }

  handleDelete() {
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
    console.log(this.state);
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
    console.log(name, value);
    this.setState({
      [name]: value
    })
  }

  render() {
    const { user, movies } = this.props;
    console.log(user);
    const FavoriteMovieList = movies.filter((movie) => {
      return user.FavoriteMovies.includes(movie._id);
    });
    return (
      <Container className="userProfile">
        <Row className="justify-content-md-center">
          <Col md={12}>
            <div className="profile-view">
              <h2>User Details</h2>
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

            <Form className="justify-content-md-center mb-30 form">
              <h2>Update Profile</h2>
              <Form.Group controlId="formUsername">
                <Form.Label className="input">Username</Form.Label>
                <Form.Control type="text" name="Username" placeholder="Change Username" value={this.state.Username} onChange={e => this.handleChange(e)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label className="input">Password</Form.Label>
                <Form.Control type="password" name="Password" placeholder="Change Password" value={this.state.Password} onChange={e => this.handleChange(e)} />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label className="input">Email</Form.Label>
                <Form.Control type="email" name="Email" placeholder="Change Email" value={this.state.Email} onChange={e => this.handleChange(e)} />
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label className="input">Birthday</Form.Label>
                <Form.Control type="date" name="Birthday" placeholder="Change Birthday" value={this.state.Birthday} onChange={e => this.handleChange(e)} />
              </Form.Group>

              <Link to={`/users/${this.state.Username}`}>
                <Button variant="success" onClick={(e) => this.handleUpdate(e)}>
                  Save changes
                </Button>
              </Link>

              <Link to={`/`}>
                <Button variant="secondary">
                  Back to movies
                </Button>
              </Link>

              <Button variant="danger" onClick={() => this.handleDelete()}>
                Delete user
              </Button>

            </Form>

            <div className="favoriteMovies">
              <Card.Text className="mt-200" as='h3'>Favorites Movies</Card.Text>
              <Row>
                {FavoriteMovieList.map((movie) => {
                  return (
                    <Col md={3} key={movie._id}>
                      <div key={movie._id}>
                        <Card>
                          <Card.Body>
                            <Link to={`/movies/${movie._id}`}>
                              <Card.Title as='h6'>{movie.Title}</Card.Title>
                            </Link>
                            <Button className='mb-30' onClick={() => this.removeFavorite(movie)}>Remove</Button>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>

          </Col>
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired
};