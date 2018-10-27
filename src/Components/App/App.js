import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';
import CreateUser from '../CreateUser/CreateUser';
import SignIn from '../SignIn/SignIn'
import Landing from '../Landing/Landing';
import CreateProject from '../CreateProject/CreateProject'
import CreateUserGoogle from '../CreateUserGoogle/CreateUserGoogle'
import { GoogleLogin } from 'react-google-login';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {}
    };
  }

  updateUser = (user) => {
    this.setState({
      currentUser: user
    })
    
  }

  render() {
    const currentUser = this.state.currentUser;
    return (
      <div className="App">
         <Route exact path= '/' component={WelcomePage} />
         <Route exact path= '/CreateUser' component={CreateUser} />
         <Route exact path = '/CreateUserGoogle' render={({history}) => 
           <CreateUserGoogle updateUser={this.updateUser} history={history}/>
         } />
         <Route exact path= '/Landing' render={() => 
           <Landing currentUser={currentUser} />
         } />
         <Route exaxt path= '/SignIn' render={({history}) => 
          <SignIn currentUser={currentUser} updateUser={this.updateUser} history={history}/>
         } />
         <Route exact path= '/CreateProject' render={() => 
          <CreateProject currentUser={currentUser}/>
        }/>
      </div>
    );
  }
}

export default withRouter(App);
