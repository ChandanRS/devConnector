import React, { Fragment, useState } from 'react';
import {Link, withRouter} from 'react-router-dom'

import { addEducation } from '../../actions/profile';
import { connect } from 'react-redux'

const AddEducation = ({addEducation,history}) => {

    const [toDateDisabled, toggleDisabled] = useState(false)
const [formData,setFormData] = useState({
    college: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description:''
})

const {
    college,
    degree,
    fieldofstudy,
    from,
    current,
    to,
    description
} = formData
// let isCurrent = current;
    const changeHandler = e => setFormData({...formData, [e.target.name]: e.target.value })
    const submitHandler = e=> {
        e.preventDefault()
        addEducation(formData,history)
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any college, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=> submitHandler(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* College"
            name="college"
            value = { college} onChange={e=> changeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value = { degree} onChange={e=> changeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" value = { fieldofstudy } onChange={e=> changeHandler(e)}
           name="fieldofstudy" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" value = { from } onChange={e=> changeHandler(e)} name="from" />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" checked={current} value = { current } onChange={e=>{
                setFormData({...formData, current:!current }) 
                toggleDisabled(!toDateDisabled) 
            }
        }                                               
            name="current"  /> Current college 
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date"  value = { to} onChange={e=> changeHandler(e)} name="to" disabled = {toDateDisabled}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value = { description} onChange={e=> changeHandler(e)}
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" href="/dashboard">Go Back</Link>
      </form>
        </Fragment>
            
        
    );
};

export default connect(null,{addEducation})(withRouter(AddEducation));