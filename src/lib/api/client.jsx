import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://52.192.168.141:3001/api/v1',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  options
);

export default client;
