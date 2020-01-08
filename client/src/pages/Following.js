import React from 'react';
import '../App.css';

import User from './User';
import 'bootstrap/dist/css/bootstrap.css';

class Following extends React.Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem('username'),
      following_list: []
    };
  }

  componentDidMount() {
    this.fetchUsersThatIFollow();
  }

  fetchUsersThatIFollow = async () => {
    const response = await fetch('/api/follows/fetchUsersThatIFollow/' + this.state.username);
    const body = await response.json();
    this.setState({
      following_list: body
    });
  };

  handleFollowUpdate = async () => {
    await this.fetchUsersThatIFollow();
    window.location.reload();
  };

  render() {
    return (
      <div className="following-div">
        <div style={{ marginTop: '10px', fontWeight: '700' }}>Friends you are following</div>
        {this.state.following_list.map((friend, i) => (
          <User
            key={`${i}-friend`}
            content={friend.followee}
            user={this.state.username}
            friend={friend.followee}
            handleUpdate={this.handleFollowUpdate}
            type={'follow'}
          />
        ))}
      </div>
    );
  }
}

export default Following;
