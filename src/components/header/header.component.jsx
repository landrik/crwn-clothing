import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import * as ROUTES from '../../constants/routes';

import { auth } from '../../firebase/firebase.utils';
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link className="logo-container" to={ROUTES.LANDING}>
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to={ROUTES.SHOP}>Shop</Link>
            <Link className="option" to={ROUTES.CONTACT}>Contact</Link>
            { currentUser ? (<div className="option" onClick={ () => auth.signOut() }>Sign Out</div> ): (<Link className="option" to={ROUTES.SIGN_IN}> Sign In</Link>) }
            <CartIcon />
        </div>
        {
            hidden ? null : 
            <CartDropdown />
        }
    </div>
   
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})
       
export default connect(mapStateToProps)(Header);