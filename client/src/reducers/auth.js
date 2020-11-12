import axios from 'axios'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
     AUTH_ERROR,
     LOGIN_FAIL,
     LOGIN_SUCCESS,
     LOGOUT,
     DELETE_ACCOUNT
    //  CLEAR_PROFILE
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading : true,
    user: null
}
export default function (state = initialState, action){
    const { type,payload } = action
    switch(type){
        
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload)
            axios.defaults.headers.common['x-auth-token'] = payload
            return {
                ...state,
                token:payload,
                isAuthenticated: true,
                loading: false,
                
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case USER_LOADED:
        console.log({payload})
        return {
            ...state,
            // token: localStorage.getItem('token'),
            isAuthenticated: true,
            loading: false,
            user: payload
        }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['x-auth-token']
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        
        default : return state
    }
} 