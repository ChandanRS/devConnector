import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import {getAllPosts, likePost,unlikePost,getPostById} from '../../actions/post'
import {deletePost} from '../../actions/post'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Spinner from '../layout/Spinner'
import {createPost} from '../../actions/post'


const Posts = ({getAllPosts,createPost,deletePost,likePost,unlikePost,getPostById, post : {posts, loading,post}, auth}) => {

    const [postData, setPostData] = useState({
        description:''
    })

    // console.log('posts')
    // console.log(posts.length)

    useEffect(()=>{
        getAllPosts()
    },[getAllPosts])

    

    const changeHandler = e => (
        setPostData({...postData ,[ e.target.name] : e.target.value})
    )

    const deleteHandler = ( e,id )=> {
        console.log('del handler calde')
        console.log(id)
        deletePost(id)
    }

    const unlikeHandler = (e, id) => {
      unlikePost(id,auth.user._id)
    }

    const likeHandler = (e, id) => {
      likePost(id)
    }

    const openPostHandler = (e, id) => {
      console.log('id')
      console.log(id)
      getPostById(id)
    }
    
    const submitHandler = e => {
        e.preventDefault()
        console.log('submithandler called')
        console.log(postData)
        createPost(postData)
        e.target.reset()
    }

    return (
       
        <Fragment>
             {loading ? <Spinner /> : 
             <Fragment> 
                <Fragment>
                  <h1 className="large text-primary">Posts</h1>
                      <p className="lead">
                        <i className="fas fa-user"></i> Welcome to the community!
                      </p>

                      <div className="post-form">
                        <div className="bg-primary p">
                          <h3>Say Something...</h3>
                        </div>
                        <form className="form my-1" onSubmit={
                              (e)=>submitHandler(e)
                        }>
                          <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Create a post"
                            onChange = {e=>changeHandler(e)}
                            required
                          ></textarea>
                          <input
                            type="submit"
                            className="btn btn-dark my-1"
                            value="Submit"
                          />
                        </form>
                      </div>
                </Fragment>
              <Fragment>
        {posts &&
          posts.map((post) => {
            const {
                _id,
              avatar,
              comments,
              description,
              likes,
              user,
              name,
              title,
              date,
            } = post;
            // console.log(avatar, comments, description, likes, name, title, date)
            return (
              <Fragment>
                <div className="posts">
                  <div className="post bg-white p-1 my-1">
                    {avatar && (
                      <div>
                        <Link to="/profile">
                          <img className="round-img" src={avatar} alt="" />
                          {name && <h4>{name}</h4>}
                        </Link>
                      </div>
                    )}
                    <div>
                      {description && <p className="my-1">{description}</p>}
                      <p className="post-date">
                          {'Posted on ' }
                        {date &&  <Moment format="DD-MM-YYYY">{date}</Moment>}
                      </p>
                      <button onClick={(e)=> likeHandler(e,_id)} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-up"></i>
                        {likes.length >= 0 && <span>{likes.length}</span>}
                      </button>
                      <button onClick={(e)=> unlikeHandler(e,_id)} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-down"></i>
                      </button>
                      <Link to="/post" onClick={(e)=>openPostHandler(e,_id)} className="btn btn-primary">
                        Discussion{" "}
                        {comments.length >= 0 && (
                          <span className="comment-count">{comments.length}</span>
                        )}
                      </Link>
                      {auth.user._id.toString() === user.toString()  ?   <button onClick={e=>deleteHandler(e,_id)} type="button" className="btn btn-danger"> 
                        <i className="fas fa-times"></i>
                      </button> : null }
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
      </Fragment>
      </Fragment>
      }
      </Fragment>
    );
};

const mapStateToProps = state => ({
    post : state.post,
    auth : state.auth
})

export default connect(mapStateToProps,{getAllPosts,createPost,deletePost,likePost,unlikePost,getPostById})(Posts);