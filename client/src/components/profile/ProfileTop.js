import React,{Fragment} from 'react';
import { connect } from 'react-redux'



const ProfileTop = ({profile}) => {

    const {_id, name, avatar} = profile && {...profile.user}
    const { company, location, status , social} = profile;
console.log(social)
    return (
      <Fragment>
        <div class="profile-top bg-primary p-2">
          <img class="round-img my-1" src={avatar} alt="" />
          <h1 class="large">{name}</h1>
          <p class="lead">
            {status} {company}{" "}
          </p>
          <p>{location}</p>
          <div class="icons my-1">
            {social && social.website && (
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-globe fa-2x"></i>
              </a>
            )}

            {social && social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {social && social.facebook && (
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {social && social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-linkedin fa-2x"></i>
              </a>
            )}

            {social && social.youtube && (
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {social && social.instagram && (
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </div>
        </div>
      </Fragment>
    );
};



export default ProfileTop ;
