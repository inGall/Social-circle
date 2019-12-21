import React from 'react';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';

class Post extends React.Component {
  render() {
    return (
      <div className="post">
        <div className="post-photo"></div>
        {this.props.type === 'content' ? (
          <div className="post-profile">
            <div className="post-name">{localStorage.getItem('username')}</div>
            <div className="post-content">{this.props.content}</div>
          </div>
        ) : (
          <div className="post-follow-div">
            <div style={{ fontWeight: '700' }}>{this.props.content}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Post;
