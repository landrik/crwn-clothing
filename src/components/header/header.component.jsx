import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import * as ROUTES from '../../constants/routes';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => (
    <div className="header">
        <Link className="logo-container" to={ROUTES.LANDING}>
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to={ROUTES.SHOP}>Shop</Link>
            <Link className="option" to={ROUTES.CONTACT}>Contact</Link>
            { currentUser ? <div className="option" onClick={ () => auth.signOut() }>Sign Out</div> : <Link className="option" to={ROUTES.SIGN_IN}> Sign In</Link> }
        </div>
    </div>
   
)

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})
       
export default connect(mapStateToProps)(Header);