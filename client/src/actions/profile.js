import { GET_PROFILE, PROFILE_ERROR,UPDATE_PROFILE,DELETE_ACCOUNT,CLEAR_PROFILE,GET_PROFILES, GET_REPOS } from './types'
import axios from 'axios';
import { setAlert } from './alerts'
// import {Link, withRouter} from 'react-router-dom'


//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
       const res = await axios.get('/api/profile/me')
console.log({res})
       dispatch({
           type: GET_PROFILE,
           payload: res.data.profile
       })
    } catch (err) {
        console.log(err)
        setAlert('Cant get User Profile','danger')
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg : err.response.statusText, status: err.response.status}
            payload: { msg : err.response}
        })
    }
}



//create or update profile
export const createProfile = ( formData , history, edit = false  ) => async dispatch=>{
    try {
        console.log('createProfile called')
        console.log(formData)

        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post('/api/profile/me',formData,config) 
console.log('res')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile has been updated': 'Profile has been created','success'))

        if(!edit){
            history.push('/dashboard')
        }

    } catch (error) {
        console.log(error)
        
        // const errors = error.response.data.errors
        const errors = error.response
        if(errors){
            errors.forEach(err=> dispatch(setAlert(err.msg,'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg : error.response.statusText, status: error.response.status}
             payload: error
        })
    }
}


//add experience

export const addExperience = ( formData,history ) => async dispatch => {
    try {
        console.log('add experience called');
        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }

        // const body = JSON.stringify({title,company, from})
console.log('formData')
console.log(formData)
        const res = await axios.put('/api/profile/experience',formData,config)
console.log(res)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience has been added','success'))
        history.push('/dashboard')
    } catch (error) {
        // const errors = error.response
        // if(errors){
        //     errors.forEach(err=> dispatch(setAlert(err.msg,'danger')))
        // }

        console.log(error)
    }
}


//Add education
export const addEducation = ( formData,history ) => async dispatch => {
    try {
        console.log('add education called');
        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }

        // const body = JSON.stringify({title,company, from})
console.log('formData')
console.log(formData)
        const res = await axios.put('/api/profile/education',formData,config)
console.log(res)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education has been added','success'))
        history.push('/dashboard')
    } catch (error) {
        // const errors = error.response
        // if(errors){
        //     errors.forEach(err=> dispatch(setAlert(err.msg,'danger')))
        // }

        console.log(error)
    }
}


//delete an experience 

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
console.log('res')
console.log(res.data)
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        } )

        dispatch(setAlert('Experience has been deleted','success'))

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg : error.response.statusText, status: error.response.status}
             payload: error
        })
        console.log(error)
    }
}



//delete an education 

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        } )

        dispatch(setAlert('Education has been deleted','success'))

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg : error.response.statusText, status: error.response.status}
             payload: error
        })
        console.log(error)
    }
}



//delete account and profile 

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This action can not be undone'))
    try {
        const res = await axios.delete(`/api/profile`)

        dispatch({
            type:CLEAR_PROFILE
        } )
        dispatch({
            type:DELETE_ACCOUNT
        } )
        dispatch(setAlert('Your account has been permanently deleted','success'))

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg : error.response.statusText, status: error.response.status}
             payload: error
        })
        console.log(error)
    }
}


//GET ALL PROFILES

export const getAllProfiles = () => async dispatch => {
    try {
       const res = await axios.get('/api/profile')
console.log(res)
       dispatch({
           type: GET_PROFILES,
           payload: res.data
       })
    } catch (err) {
        setAlert('Cant get Profiles','danger')
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg : err.response.statusText, status: err.response.status}
            payload: { msg : err.response}
        })
    }
}



//Get Profile by user id
export const getProfileById = (id) => async dispatch => {
    try {
       const res = await axios.get(`/api/profile/user/${id}`)
// console.log('res')
// console.log(res.data)
       dispatch({
           type: GET_PROFILE,
           payload: res.data.profile
       })
    } catch (err) {
        setAlert('Cant get User Profile','danger')
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg : err.response.statusText, status: err.response.status}
            payload: { msg : err.response}
        })
    }
}



//GET GITHUB REPOS 
export const getRepos = (githubusername) => async dispatch => {
    try {
       const res = await axios.get(`/api/profile/github/${githubusername}`)

       dispatch({
           type: GET_REPOS,
           payload: res.data
       })
    } catch (err) {
        setAlert('Cant get User Profile','danger')
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg : err.response.statusText, status: err.response.status}
            payload: { msg : err.response}
        })
    }
}