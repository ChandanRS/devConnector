import React,{ Fragment ,useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import Moment from 'react-moment'
import {addComment,deleteComment} from '../../actions/post'

const Post = ({  post:{post , loading},auth,addComment,deleteComment }) => {

    const [commentData, setCommentData] = useState({
        text:''
    })

    const changeHandler = e => (
        setCommentData({...commentData ,[ e.target.name] : e.target.value})
    )
    const submitHandler = (e,id)=> {
        e.preventDefault()
        console.log('submithandler2 called')
        console.log(commentData)
        addComment(commentData,id)
        e.target.reset()
    }

    const deleteHandler = ( e,postid,commentid )=> {
        console.log('del handler calde')
        
        deleteComment(postid,commentid)
    }
    
    return (
        <Fragment>
        {loading === true ? <Spinner /> : 
            <Fragment>
                <Link to="/posts" className="btn">Back To Posts</Link>
                <div className="post bg-white p-1 my-1">
                <div>
               {post && <Link to="/profile">
                    <img
                    className="round-img"
                    src={post.avatar}
                    alt=""
                    />
                    <h4>{post.name}</h4>
                </Link>
                 }
                </div>
                <div>
                {post && <p className="my-1">
                {post.description}
                </p>
                }
                </div>
            </div>

            <div className="post-form">
                <div className="bg-primary p">
                <h3>Leave A Comment</h3>
                </div>
        <form className="form my-1" onSubmit={(e)=> submitHandler(e,post._id)} >
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Comment on this post"
                    onChange = {e=>changeHandler(e)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form> 
            </div>
       
            {post && post.comments && 
            post.comments.map(p=>
                <div className="comments">
                
                <div className="post bg-white p-1 my-1">
                    <div>
                        <Link to="/profile">
                        <img
                            className="round-img"
                            src={p.avatar}
                            alt=""
                        />
                        <h4>{p.name}</h4>
                        </Link>
                    </div>
                    <div>
                        <p className="my-1">
                    {p.text}
                        </p>
                        {p && <p className="post-date">
                            Posted on <Moment format="DD-MM-YYYY">{p.date}</Moment>
                        </p>}

                        
                    {
                        auth && auth.user._id.toString() === p.user.toString() ?
                        <button   
                            onClick={e=>deleteHandler(e,post._id.toString(),p._id.toString())}
                            type="button"
                            className="btn btn-danger">
                            <i className="fas fa-times"></i>
                        </button> 
                        : null
                    }
                    </div>


                </div>
            </div>
                )
            
            
            }
            </Fragment>
      }
      </Fragment>
    );
};

// Post.propTypes = {
    
// };

const mapStateToProps = state => ({
    post : state.post,
    auth: state.auth
})

export default connect(mapStateToProps,{addComment,deleteComment})(Post) ;