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
    console.log(this.state.post_list);
  };

  handleChangeContent = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = async e => {
    await fetch('/api/posts/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.state.username, content: this.state.content })
    });
    this.fetchAllPost();
  };

  render() {
    return (
      <div className="main-body">
        <Form noValidate onSubmit={this.handleSubmit} className="form">
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
          <Post type="content" key={`${i}-post`} content={post.content} />
        ))}
      </div>
    );
  }
}

export default MainBody;
