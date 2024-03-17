import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/user_action';

export default function withAuthCheck (SpecificComponent, option, adminRoute = null) {

    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        console.log("어떤형식:",props);
        const navigate = useNavigate(); // useNavigate를 사용하여 history 객체에 접근
        useEffect(()=> {
            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 하지 않은 상태 
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login')
                    }
                }else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    } else {
                        if (option === false)
                            navigate('/')
                    }
                }
            })
        }, [dispatch, navigate, option, adminRoute]) // dispatch와 props.history를 종속성 배열에 추가
        return <SpecificComponent {...props} />; // props를 SpecificComponent로 전달
        
    }
    return AuthenticationCheck
}
