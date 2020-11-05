import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";

import './App.css';

import * as ROUTES from './constants/routes';

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot =>{
          //console.log(snapShot.data());
          setCurrentUser({
            id: snapShot.id,
              ...snapShot.data()
          })
        });
        
      }else{
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }


  render(){
    return(
      <div>
        <Header />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={ HomePage } />
          <Route path={ROUTES.SHOP} component={ ShopPage } />
          <Route exact path={ROUTES.CHECKOUT} component={ CheckoutPage } />
          <Route 
           exact 
           path={ROUTES.SIGN_IN} 
           render={() => 
            this.props.currentUser ? (
              <Redirect to='/' /> 
            ) : (
              <SignInAndSignUpPage />
            ) 
           } 
          />
        </Switch>
        </div>
    )
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
