import React,{Fragment,useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import { createProfile,getCurrentProfile } from '../../actions/profile'

const EditProfile = ({ profile: {profile, loading},createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        company : '',
        website : '',
        location : '',
        status : '',
        skills : '',
        bio : '',
        githubusername : '',
        youtube : '',
        twitter : '',
        facebook : '',
        linkedin : '',
        instagram : '',
    })

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
  } = formData

    const [showSocialMediaInputs,toggleSocialHandles] = useState(false)

    useEffect(()=>{
        getCurrentProfile()

        setFormData({
            company : loading || !profile.company ? '' : profile.company,
            website : loading || !profile.website ? '' : profile.website,
            location : loading || !profile.location ? '' : profile.location,
            status : loading || !profile.status ? '' : profile.status,
            location : loading || !profile.location ? '' : profile.location,
            skills : loading || !profile.skills ? '' : profile.skills,
            bio : loading || !profile.bio ? '' : profile.bio,
            githubusername : loading || !profile.githubusername ? '' : profile.githubusername,
            youtube : loading || !profile.social ? '' : profile.social.youtube,
            twitter : loading || !profile.social ? '' : profile.social.twitter,
            facebook : loading || !profile.social ? '' : profile.social.facebook,
            linkedin : loading || !profile.social ? '' : profile.social.linkedin,
            instagram : loading || !profile.social ? '' : profile.social.instagram
        })
    },[loading])


    

   

    const changeHandler = e => setFormData({...formData,[e.target.name]: e.target.value})

    const submitHandler = e => {
        e.preventDefault()
        createProfile(formData, history,true)
    }
    console.log('profile')
    console.log(profile)
    console.log('company')
    if(profile)
    console.log(profile.company)

    return (
      <Fragment>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => submitHandler(e)}>
          <div className="form-group">
            <select
              value={status}
              onChange={(e) => changeHandler(e)}
              name="status">
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={(e) => changeHandler(e)} />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={(e) => changeHandler(e)} />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => changeHandler(e)} />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={(e) => changeHandler(e)}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={(e) => changeHandler(e)}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(e) => changeHandler(e)}
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => toggleSocialHandles(!showSocialMediaInputs)}
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {showSocialMediaInputs && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => changeHandler(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => changeHandler(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => changeHandler(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => changeHandler(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="btn btn-primary my-1" />
          {/* <a className="btn btn-light my-1" href="dashboard.html">Go Back</a> */}
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile:  state.profile
})

export default connect(mapStateToProps, {createProfile,getCurrentProfile})(withRouter(EditProfile));    