import React,{Fragment} from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth : {isAuthenticated, loading}, logout }) => {
    const authLinks = (
      <ul>
        <Link to="/profiles">Developers</Link>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>
          <span className="hide-sm">Dashboard</span>
        </Link>
        <Link to="/posts">Posts</Link>
        <Link onClick={logout} to="/#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </Link>
      </ul>
    );
    const guestLinks = (
      <ul>
        <Link to="/profiles">Developers</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </ul>
    );
    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector </Link>
                </h1>
              {!loading && <Fragment> {isAuthenticated? authLinks : guestLinks} </Fragment>}
            </nav>
        </div>
    );
};

Navbar.propTypes = {
    logout : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps,{ logout })(Navbar);