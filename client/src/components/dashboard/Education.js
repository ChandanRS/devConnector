import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile' 

const Education = ({education , deleteEducation}) => {

    const educations =education && education.map(edu => (
        <tr key='edu._id'>
        <td>{edu.college}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td><Moment format="YYYY/MM/DD">{edu.from}</Moment> - {' '}
        {edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment>: 'Now'} 
        </td>
        <td>{edu.description}</td>
        <td onClick={()=> deleteEducation(edu._id)} className="btn btn-danger">Delete</td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Education Credientials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>college</th>
                        <th className='hide-sm'>degree</th>
                        <th className='hide-sm'>fieldofstudy</th>
                        <th className='hide-sm'>Duration</th>
                        <th className='hide-sm'>Description</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    education : PropTypes.array.isRequired,
    deleteEducation : PropTypes.func.isRequired
};

export default connect(null,{deleteEducation} )(Education);