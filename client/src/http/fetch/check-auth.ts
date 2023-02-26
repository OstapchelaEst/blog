import axios from 'axios';

export const fetchCheckAuth = async () => {
  return await axios
    .post('http://localhost:5000/refresh', {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
