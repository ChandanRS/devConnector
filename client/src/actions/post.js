import axios from 'axios'
import  { POST_ERROR,GET_POSTS,COMMENT_DELETE_ERROR, DELETE_COMMENT,CREATE_POST,COMMENT_ERROR ,DELETE_POST,LIKE_POST,LIKE_ERROR,ADD_COMMENT,UNLIKE_POST,UNLIKE_ERROR,GET_POST}  from '../actions/types'
import { setAlert } from './alerts'

//GET ALL THE POSTS
export const getAllPosts = () => async dispatch => {
    try {
        // const res = await axios.get('http://localhost:8000/api/posts/')
        const res = await axios.get('/api/posts/')
        console.log(res)

        dispatch({
            type: GET_POSTS,
            payload :res.data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: COMMENT_ERROR
        })
    }
}


//CREATE A POST
export const createPost = (postData) => async dispatch => {
    try {
        
           const config = {
                'Content-Type':'application/json'
            }
           
       
        // const res = await axios.post('http://localhost:8000/api/posts/',postData,config )
        const res = await axios.post('/api/posts/',postData,config )
        console.log('rest')
        console.log(res)
        dispatch({
            type: CREATE_POST,
            payload :res.data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: POST_ERROR
        })
    }
}



//DELETE A POST
export const deletePost = (id) => async dispatch => {
    try {
        console.log('post delete action called')
     const res =  await axios.delete(`/api/posts/delete/${id}`)
        console.log(res)
        dispatch({
            type:DELETE_POST,
            payload: id
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: POST_ERROR
        })
        dispatch(setAlert('You can not delete others posts','danger' ))
    }
}


//LIKE A POST
export const likePost = (id) => async dispatch => {
    try {
        console.log('likePost action called')
     const res =  await axios.put(`/api/posts/like/${id}`)
        console.log(res)
        dispatch({
            type:LIKE_POST,
            payload: {
                likesArray : res.data,
                id
            }
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: LIKE_ERROR
        })
        dispatch(setAlert('You have already liked the post'))
    }
}


//UNLIKE A POST
export const unlikePost = (Id,userId) => async dispatch => {
    try {
        console.log('Unlike action called')
     const res =  await axios.put(`/api/posts/unlike/${Id}`)
        console.log('res')
        console.log(res)
        dispatch({
            type:UNLIKE_POST,
            payload: {
                likesArr : res.data,
                Id,
                userId
            }
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: UNLIKE_ERROR
        })
        dispatch(setAlert('You have Not liked the post'))
    }
}

//GET A POST BY ID

export const getPostById = ( id ) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)
        console.log(res)

        dispatch({
            type: GET_POST,
            payload :res.data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: POST_ERROR
        })
    }
}


//ADD A COMMENT ON A POST

export const addComment = (commentData,id) => async dispatch => {
    try {
        
           const config = {
                'Content-Type':'application/json'
            }
           
       
        const res = await axios.post(`api/posts/comment/${id}`,commentData,config )
        console.log('ressss')
        console.log(res.data)
        dispatch({
            type: ADD_COMMENT,
            payload :res.data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: POST_ERROR
        })
    }
}

//deleteComment

export const deleteComment = (postid,commentid) => async dispatch => {
    try {
        console.log('comment delete action called')
     const res =  await axios.delete(`/api/posts/comment/${postid}/${commentid}`)
        console.log(res)
        dispatch({
            type:DELETE_COMMENT,
            payload: res.data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: COMMENT_DELETE_ERROR
        })
        dispatch(setAlert('can not delete comment','danger' ))
    }
}
