import React from 'react';
import '../App.css';

import Post from './Post';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class MainBody extends React.Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem('username'),
      content: '',
      post_list: []
    };
  }

  componentDidMount() {
    this.fetchAllPost();
  }

  fetchAllPost = async () => {
    const response = await fetch('/api/posts/' + this.state.username);
    const body = await response.json();
    this.setState({
      post_list: body
    });
  };

  handleChangeContent = e => {
    this.setState({ content: e.target.value });
  };

  handleAdd = async () => {
    await fetch('/api/posts/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.state.username, content: this.state.content })
    });
    this.fetchAllPost();
  };

  handleDelete = async post => {
    await fetch('/api/posts/delete/', {
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
        <Form noValidate onSubmit={this.handleAdd} className="form">
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
          <Post key={`${i}-post`} post={post} onDelete={this.handleDelete} />
        ))}
      </div>
    );
  }
}

export default MainBody;
