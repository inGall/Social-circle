import React from 'react';
import '../App.css';

import Post from './Post';
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
    this.fetchAllFollowers();
  }

  fetchAllFollowers = async () => {
    const response = await fetch('/api/follows/following/' + this.state.username);
    const body = await response.json();
    this.setState({
      following_list: body
    });
  };

  render() {
    return (
      <div className="following-div">
        <div style={{ marginTop: '10px', fontWeight: '700' }}>Friends you are following</div>
        {this.state.following_list.map((friend, i) => (
          <Post type="friend" key={`${i}-friend`} content={friend.followee} />
        ))}
      </div>
    );
  }
}

export default Following;
