import React from 'react';
import '../App.css';

import User from './User';
import 'bootstrap/dist/css/bootstrap.css';

class Follower extends React.Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem('username'),
      follower_list: []
    };
  }

  componentDidMount() {
    this.fetchAllFollowers();
  }

  fetchAllFollowers = async () => {
    const response = await fetch('/api/follows/follower/' + this.state.username);
    const body = await response.json();
    this.setState({
      follower_list: body
    });
    console.log(this.state.follower_list);
  };

  render() {
    return (
      <div className="following-div">
        <div style={{ marginTop: '10px', fontWeight: '700' }}>Friends that are following you</div>
        {this.state.follower_list.map((friend, i) => (
          <User
            key={`${i}-friend`}
            content={friend.follower}
            user={this.state.username}
            friend={friend.follower}
            follow="follower"
          />
        ))}
      </div>
    );
  }
}

export default Follower;
