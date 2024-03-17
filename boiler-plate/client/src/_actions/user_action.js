import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER

} from './types';

export function loginUser(dataToSubmit) {

    console.log("넘어왔나/",dataToSubmit)

    const request = axios.post('/api/users/login',dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}



// export function auth() { //get메소드기에 body부분이 필요없음

//    const request = axios.get('/api/users/auth')
//        .then(response => response.data)

//    return {
//        type: AUTH_USER,
//       payload: request
//    }
//}

export function auth() {
    const token = localStorage.getItem('token'); // 저장된 토큰을 가져옵니다.
    
    const request = axios.get('/api/users/auth', {
        headers: {
            Authorization: `Bearer ${token}` // Bearer 접두사와 함께 토큰을 헤더에 포함합니다.
        }
    }).then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    };
}