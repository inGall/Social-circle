import React from 'react';
import '../App.css';

import { Dropdown } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'bootstrap/dist/css/bootstrap.css';

class Post extends React.Component {
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
      <div>
        {this.props.type === 'content' ? (
          <div className="post">
            <div className="post-photo"></div>
            <div className="post-profile">
              <div className="post-name">{localStorage.getItem('username')}</div>
              <div className="post-content">{this.props.post.content}</div>
            </div>
            <Dropdown onSelect={this.handleSelect} style={{ position: 'absolute', right: '0' }}>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic"></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Remove Post</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="post">
            <div className="post-photo"></div>
            <div className="post-follow-div">
              <div style={{ fontWeight: '700' }}>{this.props.content}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Post;
