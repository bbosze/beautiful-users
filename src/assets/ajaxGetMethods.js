import axios from 'axios';

const url = 'https://randomuser.me/api/'

export const getUsers = () => {
  return axios.get(`${url}?results=100`)
  .then(response => response.data.results)
  .catch(error => {
    console.log(error);
  })
}
