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
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchNameOfUser();
    this.fetchIfFollow();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    this.fetchNameOfUser();
  }

  /* Fetch name of user to display */
  fetchNameOfUser = async () => {
    const response = await fetch('/api/users/fetchNameOfUser/' + this.props.friend);
    const body = await response.json();
    if (this._isMounted) {
      this.setState({
        name: body[0].name
      });
    }
  };

  /* Check status of connection with friend */
  fetchIfFollow = async () => {
    var follower = this.props.user;
    var followee = this.props.friend;
    const response = await fetch('/api/follows/fetchIfFollow/' + follower + '/' + followee);
    const body = await response.json();
    const response2 = await fetch('/api/requests/fetchIfRequest/' + follower + '/' + followee);
    const body2 = await response2.json();
    if (this._isMounted) {
      this.setState({
        status: body.length ? 'following' : body2.length ? 'pending' : 'follow'
      });
    }
  };

  /* Function calls when user click on Follow button */
  handleRequest() {
    if (this.state.status === 'follow') {
      this.handleFollowRequest();
      this.setState({
        status: 'pending'
      });
    } else if (this.state.status === 'pending') {
      this.setState({
        status: 'follow'
      });
      this.handleRemoveRequest(this.props.user, this.props.friend);
    } else if (this.state.status === 'following') {
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

  /* Inserts entry into Request table */
  handleFollowRequest = async () => {
    var follower = this.props.user;
    var followee = this.props.friend;
    await fetch('/api/requests/handleFollowRequest', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ follower: follower, followee: followee })
    });
  };

  /* Called when user accepts follow request */
  handleFollow = async () => {
    var follower = this.props.friend;
    var followee = this.props.user;
    await fetch('/api/follows/handleFollow', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ follower: follower, followee: followee })
    });
    this.handleRemoveRequest(this.props.friend, this.props.user);
  };

  /* Called when either Accept or Decline Button is clicked */
  handleRemoveRequest = async (follower, followee) => {
    await fetch('/api/requests/handleRemoveRequest', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ follower: follower, followee: followee })
    });
    this.props.handleUpdate();
  };

  /* Unfollows friend */
  handleUnfollow = async () => {
    var follower = this.props.user;
    var followee = this.props.friend;
    await fetch('/api/follows/handleUnfollow', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ follower: follower, followee: followee })
    });
    this.fetchIfFollow();
    this.props.handleUpdate();
  };

  render() {
    return (
      <div
        className="post"
        style={{
          border:
            this.state.status === 'following'
              ? '2px solid rgb(154, 38, 189)'
              : this.state.status === 'pending'
              ? '2px solid #F1C40F'
              : '2px solid #5bc0de'
        }}
      >
        <div className="post-photo"></div>
        <div className="user-content">
          <div>
            <div style={{ fontWeight: '700' }}>{this.state.name}</div>
            <div>{'@' + this.props.content}</div>
          </div>
          {this.props.type === 'follow' ? (
            <Button
              style={{ marginLeft: 'auto' }}
              className={
                this.state.status === 'following'
                  ? 'btn btn-secondary'
                  : this.state.status === 'pending'
                  ? 'btn btn-warning'
                  : 'btn btn-info'
              }
              onClick={this.handleRequest}
            >
              {this.state.status}
            </Button>
          ) : (
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="success" onClick={this.handleFollow}>
                Accept
              </Button>
              <Button
                variant="warning"
                onClick={() => this.handleRemoveRequest(this.props.friend, this.props.user)}
              >
                Decline
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default User;
