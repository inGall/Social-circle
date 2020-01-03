import React from 'react';
import '../App.css';

import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'bootstrap/dist/css/bootstrap.css';

class User extends React.Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      name: '',
      status: ''
    };
    this.handleFollowRequest = this.handleFollowRequest.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchName();
    this.fetchIfFollow();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchName = async () => {
    const response = await fetch('/api/users/name/' + this.props.friend);
    const body = await response.json();
    this.setState({
      name: body[0].name
    });
  };

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
      <div className="post">
        <div className="post-photo"></div>
        <div className="user-content">
          <div>
            <div style={{ fontWeight: '700' }}>{this.state.name}</div>
            <div>{'@' + this.props.content}</div>
          </div>
          <Button
            style={{ marginLeft: 'auto' }}
            className={this.state.status === 'Following' ? 'btn btn-secondary' : 'btn btn-info'}
            onClick={this.handleFollowRequest}
          >
            {this.state.status}
          </Button>
        </div>
      </div>
    );
  }
}

export default User;
