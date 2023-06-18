import axios from 'axios';

// const {token} = window;
const baseURL = 'http://localhost:3000';
const config = {
  baseURL,
//   headers: { Authorization: `Bearer ${token}` },
};
const requestToServer = axios.create({ ...config });

export default requestToServer;