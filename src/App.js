import React, { Component } from 'react';

import { getUsers } from './assets/ajaxGetMethods';
import UserList from './components/UserList';


const isPrime = (n, d = 2) => {
  return Math.abs(n)<2
  ? false
  : Math.abs(n)===d
  ? true:n%d===0
    ? false
    :isPrime(n,d+1);
}

const getNumber = (value) => {
  return value.toString().length < 2
  ? false
  : isNaN(value)
  ? Number(value.replace(/\D/g, ""))
  : value
}

const hasTwoPrimes = (numbersArr) => {
  let counter = 0;
  for (let i = 0; i < numbersArr.length; i++ ) {
    if (isPrime(numbersArr[i])) {
      counter ++;
      if (counter === 2) {
        return true
      }
    }
  }
  return false;
}

const splitNumber = (number) => {
  let splitted = number.toString().split('');
  for (let i = 2; i < splitted.length; i ++) {
    for (let j = 0; j < splitted.length - (i - 1); j ++) {
      // console.log(number.toString().substr(j, i));
    }
  }
  // 23323
  return splitted
}

const codeChecker = (postCode) => {
  if (!getNumber(postCode)) {
    return false
  }
  let number = getNumber(postCode);
  let splitted = number.toString().split('');
  return [splitted, hasTwoPrimes(splitNumber(number))];
}

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
    console.log(codeChecker(22898));
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
