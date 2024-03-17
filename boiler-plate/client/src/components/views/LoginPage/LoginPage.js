
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../../_actions/user_action";
import Auth from '../../../hoc/auth';
//import { response } from "express";

function LoginPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[Email, setEmail] = useState("");
    const[Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('Email',Email);
        console.log('password',Password);

        let body={
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    navigate('/')    // react페이지 이동에 사용 
                } else {
                    alert('로그인 푸시 안됨Error')
                }
            })
        // Axios.post('/api/user/login',body)  // user_action.js에서 사용
        // .then(response => {

        // })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>
                <br/>
                <button type="submit">
                    login
                </button>

            </form>

        </div>

    )
}

export default Auth(LoginPage, false);