import React from 'react';
import '../App.css';

import User from './User';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { MDBCol, MDBIcon } from 'mdbreact';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem('username'),
      user_list: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    if (e.target.value !== '') {
      this.fetchUsersWithKeyword(e.target.value);
    }
  }

  fetchUsersWithKeyword = async keyword => {
    const response = await fetch('/api/users/fetchUsersWithKeyword/' + this.state.username + '/' + keyword);
    const body = await response.json();
    this.setState({
      user_list: body
    });
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
        <MDBCol md="6">
          <form className="form-inline mt-4 mb-4">
            <MDBIcon icon="search" />
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="text"
              onChange={this.handleInputChange}
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </MDBCol>
        {this.state.user_list.map((friend, i) => (
          <User
            key={`${i}-friend`}
            content={friend.username}
            user={this.state.username}
            friend={friend.username}
          />
        ))}
      </div>
    );
  }
}

export default Search;
