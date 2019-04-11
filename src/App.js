import React, { Component } from 'react';

import UserList from './components/UserList';
import { getUsers } from './assets/ajaxGetMethods';
import { codeChecker } from './assets/codeChecker';

class App extends Component {
  state = {
    users: null,
  }

  componentDidMount = async () => {
    await getUsers()
    .then(response => {
      this.setState({
        users: response.filter(user => codeChecker(user.location.postcode)),
      })
    });
  }

  render() {
    const { users } = this.state
    return (
      <div>
        {
          users
          ? <UserList users={ users }/>
          : 'loading'
        }
      </div>
    );
  }
}

export default App;
