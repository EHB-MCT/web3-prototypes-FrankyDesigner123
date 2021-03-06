import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
	const authLinks = (
		<ul>
			<li>
				<Link onClick={logout} to="/">
					<i className="fas fa-sign-out-alt"></i>
					{'  '}
					<span className="hide-sm">Logout</span>
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);
	return (
		<nav className="navbar bg-dark ">
			<h1>
				<Link to="/">
					<i className="fab fa-react"></i> Dashboard
				</Link>
			</h1>

			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapToStateProps = (state) => ({
	auth: state.auth,
});

export default connect(mapToStateProps, { logout })(Navbar);
