import React, { Fragment } from 'react';
import Moment from 'react-moment'

const ProfileExperience = ({profile}) => {
    const { experience } = profile && profile;

    return(
         <Fragment>
            <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>

                {experience && experience.map(exp=>(
                    <div>
                    <h3 className="text-dark">{exp.company}</h3>
                    <p><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}</p>
                    <p> {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment>: 'Now'}</p>
                    <p><strong>Position: </strong>{exp.title}</p>
                    <p>
                    <strong>Description: </strong>{exp.description}
                    </p>
                </div>
                ))}

                
            </div>
        </Fragment>
    )
   
}

export default ProfileExperience;