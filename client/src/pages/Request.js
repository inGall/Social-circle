import React from 'react';
import '../App.css';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      following_list: []
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div style={{ backgroundColor: '#d8e0e6', minHeight: '100vh' }}>
        <Navbar className="navBar">
          <Nav className="mr-auto">
            <Nav.Link href="/MainPage">Home</Nav.Link>
            <Nav.Link href="/Search">Search</Nav.Link>
            <Nav.Link href="/Request">Requests</Nav.Link>
          </Nav>
        </Navbar>
        <div>Request</div>
      </div>
    );
  }
}

export default Request;
