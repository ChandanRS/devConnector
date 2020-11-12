import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProfileItems = ({ profile }) => {
  const { _id, name, avatar } = { ...profile.user };
  const { location, skills, status } = profile;

  return (
    <Fragment>
      {profile && (
        <div className="profiles">
          <div className="profile bg-light">
            <img className="round-img" src={avatar} alt="" />
            <div>
              <h2>{name}</h2>
              <p>{status}</p>
              <p>{location}</p>
              <Link to={`/profile/${_id}`} className="btn btn-primary">
                View Profile
              </Link>
            </div>

            <ul>
              {skills.map((skill, index) => (
                <li key={index} className="text-primary">
                  <i className="fas fa-check"></i> {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProfileItems;
