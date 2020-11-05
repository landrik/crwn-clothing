import React from "react";
//import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import * as ROUTES from '../../constants/routes';

import { auth } from '../../firebase/firebase.utils';
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./header.styles";
//import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to={ROUTES.LANDING}>
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to={ROUTES.SHOP}>Shop</OptionLink>
            <OptionLink to={ROUTES.CONTACT}>Contact</OptionLink>
            { currentUser ? (<OptionLink as='div' onClick={ () => auth.signOut() }>Sign Out</OptionLink> ): (<OptionLink className="option" to={ROUTES.SIGN_IN}> Sign In</OptionLink>) }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : 
            <CartDropdown />
        }
    </HeaderContainer>
   
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})
       
export default connect(mapStateToProps)(Header);