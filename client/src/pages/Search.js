import React from 'react';
import '../App.css';

import Post from './Post';
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
    this.fetchKeyUsers(e.target.value);
  }

  fetchKeyUsers = async keyword => {
    const response = await fetch('/api/users/retrieve/' + this.state.username + '/' + keyword);
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
            <Nav.Link href="#pricing">Pricing</Nav.Link>
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
          <Post
            type="friend"
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