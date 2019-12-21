import React from 'react';
import '../App.css';

import MainBody from './MainBody';
import Profile from './Profile';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class MainPage extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: '#d8e0e6' }}>
        <Navbar className="navBar">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Featuress</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>
        <Profile />
        <MainBody />
      </div>
    );
  }
}

export default MainPage;
