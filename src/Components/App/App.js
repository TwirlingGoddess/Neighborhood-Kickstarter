import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';
import CreateUser from '../CreateUser/CreateUser';
import SignIn from '../SignIn/SignIn'
import Landing from '../Landing/Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Route exact path= '/' component={WelcomePage} />
         <Route exact path= '/CreateUser' component={CreateUser} />
         <Route exact path= '/Landing' component={Landing} />
         <Route exaxt path= '/SignIn' component={SignIn} />
      </div>
    );
  }
}

export default App;
