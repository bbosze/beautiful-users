import React, { Component } from 'react';
import './UserList.scss';

class UserList extends Component {
  state = {
    currentPage: 1,
    usersPerPage: 10,
  };

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { currentPage, usersPerPage } = this.state;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    let users = [];
    if (this.props.users) {
      users = this.props.users;
    }
    let currentUsers = []
    if (this.props.users) {
      currentUsers = this.props.users.slice(indexOfFirstUser, indexOfLastUser);
    }

    const renderUsers = currentUsers.map((user, index) => {
      return <li
        key={user.login.uuid}
      >
        {
          `${user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)}
          ${user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)} |
          gender: ${user.gender} |
          postal code: ${user.location.postcode} |
          first 2 primes: ${user.primes}`
        }
      </li>;
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          className={(currentPage === number ? 'pagination-item active' : '')}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        <ul className="users">
          {renderUsers}
        </ul>
        <ul className="pagination">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

export default UserList;
