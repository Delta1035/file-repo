import axios from 'axios';

const httpClient = axios.create();

httpClient.get('http://www.baidu.com').then(v => {
    console.log(v.data);
});