import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifySignup = this.verifySignup.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  /* Updates state username, name and password everytime user edits input field */
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  /* Validates if username and password tallys */
  validateCredentials = async () => {
    var username = this.state.username;
    var password = this.state.password;
    const response = await fetch('/api/users/validateCredentials/' + username + '/' + password);
    const body = await response.json();
    if (body.length && username !== '' && password !== '') {
      this.login(body[0].username);
    } else {
      this.loginStatusAlert();
    }
  };

  login = async username => {
    localStorage.setItem('username', username);
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

  /* Checks if all fields are not empty */
  verifySignup = async () => {
    if (!this.state.username || !this.state.name || !this.state.password) {
      alert('Please fill in all input field');
    } else {
      var userExist = await this.checkIfUserAlreadyExist();
      if (!userExist) {
        this.signup();
      } else {
        this.signupStatusAlert(false, this.state.username);
      }
    }
  };

  /* Checks if username already exist. Returns true if user exist */
  checkIfUserAlreadyExist = async () => {
    var username = this.state.username;
    const response = await fetch('/api/users/checkIfUserAlreadyExist/' + username);
    const body = await response.json();
    return body.length;
  };

  /* Inserts query */
  signup = async () => {
    await fetch('/api/users/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name
      })
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
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Group style={{ width: '48%' }}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Eg. john123"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group style={{ marginLeft: 'auto', width: '48%' }}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" type="text" placeholder="Eg. John" onChange={this.handleChange} />
                </Form.Group>
              </div>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="text"
                  placeholder="Eg. 1234567"
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
              <Button variant="success" type="button" onClick={this.verifySignup}>
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
