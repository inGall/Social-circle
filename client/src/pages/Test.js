import React from 'react';

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: []
    };
  }

  getUserList = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        var userList = res.map(r => r.name);
        this.setState({ userList });
      });
  };

  addUser(event) {
    event.preventDefault();
    var u_name = this.refs.uname.value;
    var u_id = this.refs.uid.value;
    console.log(u_name + 'and' + u_id);
    fetch('/api/users', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: u_id, uname: u_name })
    })
      .then(res => res.json())
      .then(res => {
        this.getUserList();
      });
  }

  componentDidMount() {
    this.getUserList();
  }

  render() {
    return (
      <div>
        <div>Hellodd</div>
        <form>
          <input type="text" ref="uname" placeholder="uname"></input>
          <input type="text" ref="uid" placeholder="uid"></input>
          <button onClick={this.addUser.bind(this)}>Add User</button>
        </form>
      </div>
    );
  }
}

export default Test;
