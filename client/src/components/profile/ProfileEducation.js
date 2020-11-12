import React,{Fragment} from 'react';
import Moment from 'react-moment'

const ProfileEducation = ({profile}) => {

    const { education } = profile;
    return (
        <Fragment>
             <div class="profile-edu bg-white p-2">
            <h2 class="text-primary">Education</h2>

            {education && education.map(edu=>(
                 <div>
                 <h3>{edu.college}</h3>
                 <p><Moment format="YYYY/MM/DD">{edu.from}</Moment> -<Moment format="YYYY/MM/DD">{edu.to}</Moment></p>
                 <p><strong>Degree </strong>{edu.degree}</p>
                 <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                 <p>
                 <strong>Description: </strong>{edu.description}
                 </p>
           </div>
            ))}
        </div>
        </Fragment>
    );
};

export default ProfileEducation;