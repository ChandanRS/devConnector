import{  GET_POSTS, POST_ERROR,DELETE_COMMENT, CREATE_POST,ADD_COMMENT, DELETE_POST,LIKE_POST,LIKE_ERROR ,UNLIKE_POST, GET_POST} from '../actions/types'

const initialState = {
    posts:[],
    post:null,
   loading:true,
   errors:{}
//    likes:[]
}

export default function(state = initialState, action){
    const { type, payload} = action
    switch(type){
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        
        case POST_ERROR: 
            return {
                ...state,
                loading: false
            }
        case CREATE_POST:
           
            const updatedPosts = state.posts.unshift(payload)
            return {
                ...state,
                ...updatedPosts,
                post:payload,
                loading: false
            }

        case DELETE_POST :
            const updatedPostsAfterDelete = state.posts.filter(post => post._id.toString() !== payload.toString())
           console.log(updatedPostsAfterDelete)
            return {
                ...state,
                 posts:updatedPostsAfterDelete,
                loading: false
            }

    case LIKE_POST :
        const { likesArray, id} = payload
       
        let updatedPostsAfterLike =[...state.posts]
        updatedPostsAfterLike.forEach(post => {
             
                if(post._id.toString() === id.toString()){
                   return post.likes =[...likesArray]
                }
            
            })
            
        return {
            ...state,
            posts: updatedPostsAfterLike,
            loading: false
           
        }
        case UNLIKE_POST :
            const { likesArr, Id, userId} = payload
        console.log(likesArr)
            let updatedPostsAfterUnLike = [...state.posts]
            updatedPostsAfterUnLike.forEach(post => {
              
                    if(post._id.toString() === Id.toString()){
                        post.likes = post.likes.filter(p=> p.user.toString() !== userId.toString() )
                       return post.likes
                    }
                ////humber.m23@gmail.com
                })
               
            return {
                ...state,
                posts: updatedPostsAfterUnLike,
                loading: false
               
            }
            case GET_POST:
            return {
                ...state,
                post : payload,
                loading: false
            }
            case ADD_COMMENT:
                return {
                    ...state,
                    post : payload,
                    loading: false
                }
            case DELETE_COMMENT:
                return {
                    ...state,
                    post : payload,
                    loading: false
                }
    default : return state
    }
}