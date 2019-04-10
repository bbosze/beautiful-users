import React, { Component } from 'react';

import { getUsers } from './assets/ajaxGetMethods';
import UserList from './components/UserList';

class App extends Component {
  state = {
    users: null,
  }

  componentDidMount = async () => {
    await getUsers()
    .then(response => {
      this.setState({
        users: response,
      })
    });
    console.log(this.state.users.map(user => user.location.postcode));
    // console.log(codeChecker(718));
  }

  render() {
    return (
      <div>
        <UserList />
      </div>
    );
  }
}

export default App;
