import {USER_LOGGED_IN,USER_LOGGED_OUT} from './actionTypes'

export const login = user =>{
    return {
        type: USER_LOGGED_IN,
        payload: user// obs: o nome 'type' faz parte do redux e o 'payload' eh apenas uma convencao
    }
}

export const logout = () =>{
    return {
        type: USER_LOGGED_OUT
    }
}