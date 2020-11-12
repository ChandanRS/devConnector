import React,{Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom'
import {getProfileById} from '../../actions/profile'
// import {getRepos} from '../../actions/profile'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ profile:{profile,loading,repos},getProfileById,match ,auth}) => {
    useEffect(()=>{
        getProfileById(match.params.id)
      
    },[getProfileById])

    console.log('profileeee')
    console.log(profile)
    
    // profile && profile.githubusername && console.log(profile.githubusername)
    // profile && profile.profile.githubusername && console.log(profile.profile.githubusername)
    // const githubusername = {...profile.githubusername}
// console.log(githubusername)
    return (
        <Fragment>
        {
           profile === null || loading === true ? <Spinner /> : (
                <Fragment>
                    <div className="btn btn-secondary"><Link to="/profiles">Back to Profiles</Link></div>
                  { auth.isAuthenticated && auth.loading === false && profile && auth.user._id == profile.user._id ? <div className="btn btn-secondary"><Link to="/edit-profile">Edit Profile</Link></div> : null}  
                    <ProfileTop profile = {profile} />
                    <ProfileAbout profile ={profile} />
                    <ProfileExperience profile ={profile} />
                    <ProfileEducation profile ={profile} />
                 {profile && profile.githubusername && <ProfileGithub profile ={repos} username = {profile.githubusername} />}
                </Fragment>
        )}
        </Fragment>
    )


}
const mapStateToProps = state => ({
    profile : state.profile,
    auth : state.auth
})

export default connect(mapStateToProps,{getProfileById})(Profile) ;

// ------------------------------------------DONEEEEEEEEEEEEE-----------------------------------------------












    // if(profile){
    //     console.log(profile.profile)
    // }
    //  const {_id, name, avatar} = {profile} && {...profile.user}
    //         const {
    //             bio ,
    //             company  ,
    //             education  ,
    //             experience  ,
    //             githubusername  ,
    //             location,
    //             skills ,
    //             status
    //         } = profile
    // if(profile){