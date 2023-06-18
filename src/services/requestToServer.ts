import axios from 'axios';
import Cookies from 'js-cookie';

export function getAuthHeaders() {
  const token = Cookies.get('jwt');
  return { Authorization: `${token}` };
}

// const {token} = window;2
const baseURL = 'http://localhost:3000';
const config = {
  baseURL,
};
const requestToServer = axios.create({ ...config });

export default requestToServer;