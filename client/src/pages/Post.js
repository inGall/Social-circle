import React from 'react';
import '../App.css';

import { Dropdown } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'bootstrap/dist/css/bootstrap.css';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: localStorage.getItem('username')
    };
    this.fetchName = this.fetchName.bind(this);
  }
  componentDidMount() {
    this.fetchName();
  }

  fetchName = async () => {
    const response = await fetch('/api/users/name/' + this.state.username);
    const body = await response.json();
    this.setState({
      name: body[0].name
    });
  };

  handleSelect = eventKey => {
    if (eventKey === '1') {
      confirmAlert({
        title: 'Confirm changes',
        message: 'Are you sure to remove post?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.handleDelete()
          },
          {
            label: 'No'
          }
        ]
      });
    }
  };

  handleDelete() {
    this.props.onDelete(this.props.post);
  }

  render() {
    return (
      <div className="post">
        <div className="post-photo"></div>
        <div className="post-profile">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="post-name">{this.state.name}</div>
            <div className="post-username">{'@' + this.state.username}</div>
          </div>
          <div className="post-content">{this.props.post.content}</div>
        </div>
        <Dropdown onSelect={this.handleSelect} style={{ position: 'absolute', right: '0' }}>
          <Dropdown.Toggle
            variant="outline-secondary"
            id="dropdown-basic"
            style={{ height: '40px' }}
          ></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">Remove Post</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default Post;
