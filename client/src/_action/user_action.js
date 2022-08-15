import axios from 'axios';
import { LOGIN_USER, 
         REGISTER_USER,
         AUTH_USER } from './types';

export function loginUser(dataToSubmit){
    
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)
        //서버에 request날린다음에 reponse받은 data를 request에저장한다.

    return{
        //그다음 리턴시켜서 리듀서로 보낸다.
        //액션에는 타입과 response를 적는다.
        type : LOGIN_USER,
        payload : request
        //서버에서 받은 data가 payload이다
    }
}

export function registerUser(dataToSubmit){
    
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)
        //서버에 request날린다음에 reponse받은 data를 request에저장한다.

    return{
        //그다음 리턴시켜서 리듀서로 보낸다.
        //액션에는 타입과 response를 적는다.
        type : REGISTER_USER,
        payload : request
        //서버에서 받은 data가 payload이다
    }
}

export function auth(){
    
    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return{
        type : AUTH_USER,
        payload : request
    }
}