import axios from 'axios'
export const get = async (param, callback) => {
    const serverEndpoint = "https://jsonplaceholder.typicode.com"
    const response = await axios.get(`${serverEndpoint}/${param}`);
    const json = await response.data
    if (callback) {
      callback(json);
    }
  }