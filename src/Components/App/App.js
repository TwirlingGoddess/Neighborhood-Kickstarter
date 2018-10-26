import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';
import CreateUser from '../CreateUser/CreateUser';
import SignIn from '../SignIn/SignIn'
import Landing from '../Landing/Landing';
import CreateProject from '../CreateProject/CreateProject'
import CreateUserGoogle from '../CreateUserGoogle/CreateUserGoogle'

class App extends Component {
  render() {
    return (
      <div className="App">
         <Route exact path= '/' component={WelcomePage} />
         <Route exact path= '/CreateUser' component={CreateUser} />
         <Route exact path = '/CreateUserGoogle' component={CreateUserGoogle} />
         <Route exact path= '/Landing' component={Landing} />
         <Route exaxt path= '/SignIn' component={SignIn} />
         <Route exact path= '/CreateProject' component={CreateProject}/>
      </div>
    );
  }
}

export default App;
