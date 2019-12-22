import React from 'react';
import '../App.css';

import MainBody from './MainBody';
import Profile from './Profile';
import Following from './Following';
import Follower from './Follower';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      post: true,
      following: false,
      follower: false
    };
  }

  changeView = eventKey => {
    this.setState({
      post: eventKey === 'post',
      following: eventKey === 'following',
      follower: eventKey === 'follower'
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: '#d8e0e6', minHeight: '100vh' }}>
        <Navbar className="navBar">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Featuress</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>
        <Profile handleClick={this.changeView} />
        {this.state.post ? <MainBody /> : this.state.following ? <Following /> : <Follower />}
      </div>
    );
  }
}

export default MainPage;
