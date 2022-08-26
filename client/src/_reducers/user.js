import { LOGIN_USER, 
         REGISTER_USER,
         AUTH_USER, 
         CHANGEPASSWORD} from "../_action/types";

export default function user(state = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload, message:action.payload.message }
            break;

        case REGISTER_USER:
            return {...state, register: action.payload}
            break;

        case AUTH_USER:
            return {...state, userData: action.payload}
            break;

        case CHANGEPASSWORD:
            return {...state, changeSuccess: action.payload}
            break;
    
        default : 
            return state;
            break;
    }
}