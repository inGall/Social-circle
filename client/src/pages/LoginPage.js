import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  validateCredentials = async () => {
    var username = this.state.username;
    var password = this.state.password;
    const response = await fetch('/api/users/validateCredentials/' + username + '/' + password);
    const body = await response.json();
    if (body.length && username !== '' && password !== '') {
      this.login();
    } else {
      this.loginStatusAlert();
    }
  };

  login = async () => {
    localStorage.setItem('username', this.state.username);
    this.props.history.push('/MainPage');
  };

  loginStatusAlert() {
    confirmAlert({
      title: 'Login unsuccessful',
      message: 'Username and/or password does not match',
      buttons: [
        {
          label: 'Close'
        }
      ]
    });
  }

  checkIfUserAlreadyExist = async () => {
    var username = this.state.username;
    const response = await fetch('/api/users/checkIfUserAlreadyExist/' + username);
    const body = await response.json();
    console.log(body);
    if (!body.length) {
      this.signup();
    } else {
      this.signupStatusAlert(false, this.state.username);
    }
  };

  signup = async () => {
    await fetch('/api/users/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    });
    this.signupStatusAlert(true, this.state.username);
  };

  signupStatusAlert(status, username) {
    var alert_title = status ? 'Signed up successfully' : 'Signed up unsuccessful';
    var alert_message = status
      ? 'Welcome ' + username + ' !'
      : 'Username ' + username + ' already exist, please choose another';
    confirmAlert({
      title: alert_title,
      message: alert_message,
      buttons: [
        {
          label: 'Close'
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Col className="p-4 login-col">
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Ex. A00000xx"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="text"
                  placeholder="Ex. 1234567"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={this.validateCredentials}
                style={{ marginRight: '10px' }}
              >
                Login
              </Button>
              <Button variant="success" type="button" onClick={this.checkIfUserAlreadyExist}>
                Signup
              </Button>
            </Form>
          </Col>
          {/* <Link to="/MainPage">
<Button>Go to MainPage</Button>
</Link> */}
        </Container>
      </div>
    );
  }
}

export default LoginPage;
