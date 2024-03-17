import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';


export default function (state = {}, action) { // state빈상태에서 
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }// ...빈상태 그대로
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload } // 키값은 자신이 정함
            break;
        default:
            return state;
    }
}