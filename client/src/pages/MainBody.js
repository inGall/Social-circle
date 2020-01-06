import React from 'react';
import '../App.css';

import Post from './Post';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class MainBody extends React.Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem('username'),
      content: '',
      post_list: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllPost();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchAllPost = async () => {
    const response = await fetch('/api/posts/fetchAllPost/' + this.state.username);
    const body = await response.json();
    if (this._isMounted) {
      this.setState({
        post_list: body
      });
    }
  };

  handleChangeContent = e => {
    this.setState({ content: e.target.value });
  };

  handleAddPost = async () => {
    await fetch('/api/posts/handleAddPost', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.state.username, content: this.state.content })
    });
    this.fetchAllPost();
  };

  handleRemovePost = async post => {
    await fetch('/api/posts/handleRemovePost', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: post.content,
        username: post.username,
        created_at: post.created_at
      })
    });
    this.fetchAllPost();
  };

  render() {
    return (
      <div className="main-body">
        <Form noValidate onSubmit={this.handleAddPost} className="form">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              name="post"
              as="textarea"
              rows="3"
              placeholder="Post your thoughts here!"
              onChange={this.handleChangeContent}
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ position: 'absolute', right: '0' }}>
            Post
          </Button>
        </Form>
        {this.state.post_list.map((post, i) => (
          <Post key={`${i}-post`} post={post} onDelete={this.handleRemovePost} />
        ))}
      </div>
    );
  }
}

export default MainBody;
