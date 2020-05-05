import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'




import './App.css';

import * as ROUTES from './constants/routes';

//require('dotenv').config();

class App extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount(){
    
    const { setCurrentUser } = this.props

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
          <Route path={ROUTES.SIGN_IN} component={ SignInAndSignUpPage } />
        </Switch>
        </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
