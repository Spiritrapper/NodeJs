import React, {useEffect} from "react";
import axios from 'axios';
import Auth from '../../../hoc/auth';
import { useNavigate   } from 'react-router-dom';
//import { response } from "express";

function LandingPage(props) {
    const navigate = useNavigate();


    // 가장먼저실행
    useEffect(()=> {
        axios.get('/api/hello', { timeout: 5000 }) // 서버에 보내는데 endpoint /api/hello 
        .then(response => console.log(response.data)) // 받은 요청에대한
        .catch(err => console.error(err)); // 오류 처리 추가 
    }, [])

    const onClickHandler= () => {
        
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success){
                    navigate('/login')
                }else{
                    alert('로그아웃 하는데 실패 했습니다.')
                }
                console.log(response.data)
            })
            .catch(err => console.error(err)); // 오류 처리 추가
    }

    return (
        <div  style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'}}>
           
        <h2>시작페이지</h2>

        <button onClick={onClickHandler}>
            로그아웃
        </button>
        </div>
    )
}

export default Auth(LandingPage, null);