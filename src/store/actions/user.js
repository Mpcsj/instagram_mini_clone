import {USER_LOGGED_IN,USER_LOGGED_OUT} from './actionTypes'
import axios from 'axios'
import { dispatch } from 'rxjs/internal/observable/pairs'
import {firebaseConfig} from '../../utils/UtilConstants'
const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = firebaseConfig['apiKey']
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

export const createUser = (user)=>{
    console.log('funcao createUser')
    console.log('user: ',user)
    return dispatch =>{
        console.log('authBaseURL: ',authBaseURL)
        console.log('api key: ',API_KEY)
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`,
        {
            email:user.email,
            password:user.password,
            returnSecureToken:true
        }).catch(err =>console.log(`Erro ao criar user no firebase:${err}`))
        .then(result=>{
            console.log('result obtido: ',result)
            if(result.data.localId){
                axios.put(`/users/${res.data.localId}.json`,{
                    name:user.name
                })
                .catch(err2=> console.log(`Erro ao persistir dados do user no banco firebase:${err2}`))
                .then(res=>{
                    console.log('User registrado com sucesso!')
                })
            }
        })
    }
}