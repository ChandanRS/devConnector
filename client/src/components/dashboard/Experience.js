import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience} from '../../actions/profile'

const Experience = ({experience, deleteExperience}) => {

    const experiences = experience && experience.map(exp => (
        <tr key='exp._id'>
        <td>{exp.title}</td>
        <td>{exp.company}</td>
        <td>{exp.location}</td>
        <td><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}
        {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment>: 'Now'} 
        </td>
        <td>{exp.description}</td>
        <td className="btn btn-danger" onClick={()=>deleteExperience(exp._id)}>Delete</td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience Credientials</h2>
            <table className='table'>
                <thead>
                    <tr>
                       
                        <th className='hide-sm'>Title</th>
                        <th>Company</th>
                        <th className='hide-sm'>Years</th>
                        <th className='hide-sm'>Duration</th>
                        <th className='hide-sm'>Description</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    );
};

Experience.propTypes = {
    experience : PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, {deleteExperience})(Experience);