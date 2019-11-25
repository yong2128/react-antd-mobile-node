import axios from 'axios';
let baseUrl = "http://127.20.0.161:8888";

const methodsType = {
    GET : 'GET',
    POST : 'POST',
    PUT : 'PUT',
    DELETE : 'DELETE'
};

export const requestApi = (api,method = methodsType.GET,params = {},config = {}) => {
    const data = (method === 'GET') ? 'params' : 'data';
    let headers = {
        'Content-type' : 'application/json',
        // 'token' : localStorage.getItem('token')
    };
    if(config.headers){
        headers = {
            ...headers,
            ...config.headers
        }
    }
    return new Promise((resolve,reject) => {
        axios({
            url : baseUrl + api,
            method,
            [data] : params,
            headers
        }).then((resolve)).catch((error) => {
            console.dir(error);
            // Message.error(typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data));
            reject(error);
        });
    })
};
