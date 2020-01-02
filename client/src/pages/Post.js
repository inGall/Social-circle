import React from 'react';
import '../App.css';

import { Button, Dropdown } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'bootstrap/dist/css/bootstrap.css';

class Post extends React.Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      status: ''
    };
    this.handleFollowRequest = this.handleFollowRequest.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchIfFollow();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchIfFollow = async () => {
    var follower = this.props.user;
    var followee = this.props.friend;
    const response = await fetch('/api/follows/follow/' + follower + '/' + followee);
    const body = await response.json();
    if (this._isMounted) {
      this.setState({
        status: body.length ? 'Following' : 'Follow'
      });
    }
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

  handleFollowRequest() {
    if (this.state.status === 'Follow') {
      this.handleFollow();
    } else if (this.state.status === 'Following') {
      confirmAlert({
        title: 'Confirm changes',
        message: 'Are you sure to unfollow ' + this.props.friend + ' ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.handleUnfollow()
          },
          {
            label: 'No'
          }
        ]
      });
    }
  }

  handleUnfollow = async () => {
    var follower = this.props.user;
    var followee = this.props.friend;
    await fetch('/api/follows/delete', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ follower: follower, followee: followee })
    });
    this.fetchIfFollow();
  };

  handleFollow = async () => {
    var follower = this.props.user;
    var followee = this.props.friend;
    await fetch('/api/follows/insert', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ follower: follower, followee: followee })
    });
    this.fetchIfFollow();
  };

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
        ) : (
          <div className="post">
            <div className="post-photo"></div>
            <div className="post-follow-div">
              <div style={{ fontWeight: '700' }}>{this.props.content}</div>
              <Button
                style={{ marginLeft: 'auto' }}
                className={this.state.status === 'Following' ? 'btn btn-secondary' : 'btn btn-info'}
                onClick={this.handleFollowRequest}
              >
                {this.state.status}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Post;
