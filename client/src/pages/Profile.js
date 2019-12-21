import React from 'react';
import '../App.css';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem('username'),
      post_list: [],
      following: [],
      follower: []
    };
  }
  componentDidMount() {
    this.fetchAllPost();
    this.fetchFollowing();
    this.fetchFollowers();
  }

  fetchAllPost = async () => {
    const response = await fetch('/api/posts/' + this.state.username);
    const body = await response.json();
    this.setState({
      post_list: body
    });
  };

  fetchFollowing = async () => {
    const response = await fetch('/api/follows/following/' + this.state.username);
    const body = await response.json();
    this.setState({
      following: body
    });
  };

  fetchFollowers = async () => {
    const response = await fetch('/api/follows/follower/' + this.state.username);
    const body = await response.json();
    this.setState({
      follower: body
    });
  };

  handleSelect = eventKey => {
    this.props.handleClick(eventKey);
  };

  render() {
    return (
      <div className="profile">
        <div className="photo-ph">
          <div className="photo"></div>
        </div>
        <div className="acc-ph">
          <h1 className="username-ph">{localStorage.getItem('username')}</h1>
          <Navbar className="navBar acc-navbar">
            <Nav
              className="mr-auto"
              onSelect={this.handleSelect}
              style={{ margin: ' 0 auto', width: '100%' }}
            >
              <Nav.Link eventKey="post" className="mx-auto my-auto w-25">
                <div style={{ textAlign: 'center' }}>Posts</div>
                <div style={{ textAlign: 'center' }}>{this.state.post_list.length}</div>
              </Nav.Link>
              <Nav.Link eventKey="following" className="mx-auto my-auto w-25">
                <div style={{ textAlign: 'center' }}>Following</div>
                <div style={{ textAlign: 'center' }}>{this.state.following.length}</div>
              </Nav.Link>
              <Nav.Link eventKey="follower" className="mx-auto my-auto w-25">
                <div style={{ textAlign: 'center' }}>Follower</div>
                <div style={{ textAlign: 'center' }}>{this.state.follower.length}</div>
              </Nav.Link>
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default Profile;
