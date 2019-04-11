import React, { Component } from 'react';
import './App.scss';

import UserList from './components/UserList/UserList';
import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import { getUsers } from './assets/ajaxGetMethods';
import { codeChecker } from './assets/codeChecker';

class App extends Component {
  state = {
    allUsers: null,
    filteredUsers: null,
    genderOptions: [
      { value: 'all genders', label: 'All genders'},
      { value: 'male', label: 'Men (self-identified)'},
      { value: 'female', label: 'Women (self-identified)'},
    ]
  }

  componentDidMount = () => {
    console.log(codeChecker(16610));
    getUsers()
    .then(response => {
      let usersWithTwoPrimes = response.filter(user => codeChecker(user.location.postcode).hasTwoPrimes)
        // .map(e => e.push(codeChecker(e.location.postcode).primes))
      this.setState({
        allUsers: usersWithTwoPrimes,
        filteredUsers: usersWithTwoPrimes,
      })
    });
  }

  handleSelectChange = (event) => {
    if (event.target.value === 'all genders') {
      this.setState({
        filteredUsers: this.state.allUsers,
      })
    }
    else {
      this.setState({
        filteredUsers: this.state.allUsers.filter(user => user.gender === event.target.value),
      });
    }
  }

  render() {
    const { filteredUsers, genderOptions } = this.state
    return (
      <div className="app">
        <Header />
        <select className="app-genderselect" onChange={this.handleSelectChange}>
          {genderOptions.map(option =>
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>)}
          }
        </select>
        {
          filteredUsers
          ? <UserList users={ filteredUsers }/>
          : <Loading />
        }
      </div>
    );
  }
}

export default App;
