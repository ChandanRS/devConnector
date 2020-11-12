import React,{ Fragment,useEffect } from 'react';
import {Link} from 'react-router-dom'
import {getAllProfiles} from '../../actions/profile'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner' 
import ProfileItems from './ProfileItems' 


const Profiles = ( {getAllProfiles ,profile:{profiles,loading} } ) => {

    const profs = []

    for (const value of Object.values(profiles)) {
      profs.unshift(...value)
    }


    useEffect(()=>{
        getAllProfiles()
    },[])

    return (
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Fragment>
              <h1 className="large text-primary">Developers</h1>
              <p className="lead">
              <i className="fab fa-connectdevelop"></i> Browse and connect with developers
              </p>
            </Fragment>
            {
            profs.length > 0 ? (
              profs.map((profile) => <ProfileItems profile={profile} />)
            )  : <Spinner /> 
            }
          </Fragment>
        )
        }
      </Fragment>
    );

}

const mapStateToProps = state=> ({
        profile : state.profile
       
})


export default connect(mapStateToProps, { getAllProfiles })(Profiles);