import React from 'react';
import '../App.css';

import { Navbar, Nav } from 'react-bootstrap';
import User from './User';
import 'bootstrap/dist/css/bootstrap.css';

class Request extends React.Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem('username'),
      request_list: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchRequests();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchRequests = async () => {
    const response = await fetch('/api/requests/fetchRequests/' + this.state.username);
    const body = await response.json();
    if (this._isMounted) {
      this.setState({
        request_list: body
      });
    }
  };

  handleFollowUpdate = async () => {
    await this.fetchRequests();
  };

  render() {
    return (
      <div style={{ backgroundColor: '#d8e0e6', minHeight: '100vh' }}>
        <Navbar className="navBar">
          <Nav className="mr-auto navFont">
            <Nav.Link href="/MainPage">Home</Nav.Link>
            <Nav.Link href="/Search">Search</Nav.Link>
            <Nav.Link href="/Request">Requests</Nav.Link>
            <Nav.Link href="/Setting">Setting</Nav.Link>
            <Nav.Link style={{ position: 'absolute', right: '20px' }} href="/LoginPage">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className="request-div">
          <h2 style={{ marginTop: '30px' }}>Requests</h2>
          <div className="requestFont">
            {this.state.request_list.length
              ? 'You have receive following requests from the following users'
              : 'You have no pending requests at the moment'}
          </div>
          {this.state.request_list.map((friend, i) => (
            <User
              key={`${i}-friend`}
              content={friend.follower}
              user={this.state.username}
              friend={friend.follower}
              handleUpdate={this.handleFollowUpdate}
              follow={'request'}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Request;
