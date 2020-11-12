import React, { Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { getRepos } from '../../actions/profile'
import { connect } from 'react-redux'
import profile from '../../reducers/profile';

const ProfileGithub = ({repos,getRepos,username}) => {
 
  useEffect(()=>{
      getRepos(username)
  },[getRepos(username)])
 
  
    return (
        
      repos.map(repo=>
        {
          const { id, name, full_name,stargazers_count,watchers_count, forks } = repo
        
        return(
          
        <Fragment>
         <Fragment>
        <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      </Fragment>
        <div className="profile-github">
          
             <div className="repo bg-white p-1 my-1">
                <div>
                  <h4><Link href="#" target="_blank"
                      rel="noopener noreferrer">{name}</Link></h4>
                  <p>
                   {full_name}
                  </p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars:{stargazers_count}</li>
                    <li className="badge badge-dark">Watchers:{watchers_count}</li>
                    <li className="badge badge-light">Forks: {forks}</li>
                  </ul>
                </div>
              </div>
          </div>
        
        </Fragment>
      )})

    );
};

const mapStateToProps = state => ({
  repos : state.profile.repos
})


export default connect(mapStateToProps,{getRepos})(ProfileGithub);