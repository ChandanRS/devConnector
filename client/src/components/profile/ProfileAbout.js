import React, { Fragment } from 'react';

const ProfileAbout = ({profile}) => {
    const { name, avatar} = profile && {...profile.user}
    const { bio, skills } = profile;
    return (
      <Fragment>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{name}'s Bio</h2>
          <p>{bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>

          <div className="skills">
            {skills.map((skill, index) => (
              <li key={index} className="p-1 text-primary">
                <i className="fas fa-check"></i> {skill}
              </li>
            ))}
          </div>
        </div>
      </Fragment>
    );
};

export default ProfileAbout;