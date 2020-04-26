import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';



import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Header from "./components/header/header.component";

import './App.css';

import * as ROUTES from './constants/routes';
require('dotenv').config();
class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
          //console.log(snapShot.data());
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }
          //,() => {console.log(this.state);}
          )
        });
        
      }else{
        this.setState({currentUser: userAuth});
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }


  render(){
    return(
      <div>
        <Header currentUser={ this.state.currentUser } />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={ HomePage } />
          <Route path={ROUTES.SHOP} component={ ShopPage } />
          <Route path={ROUTES.SIGN_IN} component={ SignInAndSignUpPage } />
        </Switch>
        </div>
    )
  }

}

export default App;
