import React from 'react';
import '../App.css';

import { Button, Form, Navbar, Nav } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'bootstrap/dist/css/bootstrap.css';

class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: localStorage.getItem('username'),
      password: '',
      tempName: '',
      tempPassword: '',
      nameMode: 'Saved',
      passwordMode: 'Saved'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.fetchNameOfUser();
    this.fetchPassword();
  }

  fetchNameOfUser = async () => {
    const response = await fetch('/api/users/fetchNameOfUser/' + this.state.username);
    const body = await response.json();
    this.setState({
      name: body[0].name
    });
  };

  fetchPassword = async () => {
    const response = await fetch('/api/users/fetchPassword/' + this.state.username);
    const body = await response.json();
    this.setState({
      password: body[0].password
    });
  };

  /* Returns number of * according to length of password */
  getCensoredPassword() {
    var star = '*';
    star = star.repeat(this.state.password.length);
    return star;
  }

  /* Updates state name and password everytime user edits input field */
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleChangeName = async () => {
    if (this.state.nameMode === 'Saved') {
      this.setState({
        nameMode: 'Edit'
      });
    } else {
      if (this.state.tempName === '') {
        alert('Name cannot be empty! Press cancel to exit edit mode');
      } else {
        await this.changeName();
        this.setState({
          nameMode: 'Saved',
          name: this.state.tempName
        });
        confirmAlert({
          title: 'New name: ' + this.state.name,
          message: 'Name updated successfully',
          buttons: [{ label: 'Close' }]
        });
      }
    }
  };

  changeName = async () => {
    await fetch('/api/users/changeName', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.tempName
      })
    });
  };

  handleChangePassword = async () => {
    if (this.state.passwordMode === 'Saved') {
      this.setState({
        passwordMode: 'Edit'
      });
    } else {
      if (this.state.tempPassword === '') {
        alert('Password cannot be empty! Press cancel to exit edit mode');
      } else {
        await this.changePassword();
        this.setState({
          passwordMode: 'Saved',
          password: this.state.tempPassword
        });
        confirmAlert({
          title: 'New password: ' + this.state.password,
          message: 'Password updated successfully',
          buttons: [{ label: 'Close' }]
        });
      }
    }
  };

  changePassword = async () => {
    await fetch('/api/users/changePassword', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.tempPassword
      })
    });
  };

  handleCancel = mode => e => {
    e.preventDefault();
    if (mode === 'nameMode') {
      this.setState({
        nameMode: 'Saved'
      });
    } else if (mode === 'passwordMode') {
      this.setState({
        passwordMode: 'Saved'
      });
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: '#d8e0e6', minHeight: '100vh' }}>
        <Navbar className="navBar">
          <Nav className="mr-auto">
            <Nav.Link href="/MainPage">Home</Nav.Link>
            <Nav.Link href="/Search">Search</Nav.Link>
            <Nav.Link href="/Request">Requests</Nav.Link>
            <Nav.Link href="/Setting">Setting</Nav.Link>
            <Nav.Link style={{ position: 'absolute', right: '20px' }} href="/LoginPage">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className="setting">
          <hr className="line" />
          <div className="flex-row">
            <div className="setting-row titleFont">Name: </div>
            {this.state.nameMode === 'Edit' ? (
              <div className="setting-row">
                <Form>
                  <Form.Group className="m-auto">
                    <Form.Control
                      name="tempName"
                      type="text"
                      placeholder="Eg. John"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form>
              </div>
            ) : (
              <div className="setting-row detailsFont">{this.state.name}</div>
            )}
            {this.state.nameMode === 'Edit' ? (
              <div className="m-auto">
                <Button variant="success" onClick={this.handleChangeName}>
                  Save
                </Button>
                <Button variant="secondary" onClick={this.handleCancel('nameMode')}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="m-auto">
                <Button onClick={this.handleChangeName}>Edit</Button>
              </div>
            )}
          </div>
          <div className="flex-row">
            <div className="setting-row titleFont">Userame: </div>
            <div className="setting-row detailsFont">{this.state.username}</div>
          </div>
          <div className="flex-row">
            <div className="setting-row titleFont">Password: </div>
            {this.state.passwordMode === 'Edit' ? (
              <div className="setting-row">
                <Form>
                  <Form.Group className="m-auto">
                    <Form.Control
                      name="tempPassword"
                      type="text"
                      placeholder="Eg. 123"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form>
              </div>
            ) : (
              <div className="setting-row detailsFont">{this.getCensoredPassword()}</div>
            )}
            {this.state.passwordMode === 'Edit' ? (
              <div className="m-auto">
                <Button variant="success" onClick={this.handleChangePassword}>
                  Save
                </Button>
                <Button variant="secondary" onClick={this.handleCancel('passwordMode')}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="m-auto">
                <Button onClick={this.handleChangePassword}>Edit</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;
