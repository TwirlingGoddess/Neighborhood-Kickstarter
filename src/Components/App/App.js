import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';
import CreateUser from '../CreateUser/CreateUser';
import SignIn from '../SignIn/SignIn'
import Landing from '../Landing/Landing';
import CreateProject from '../CreateProject/CreateProject'
import CreateUserGoogle from '../CreateUserGoogle/CreateUserGoogle';
import UserProjects from '../UserProjects/UserProjects';
import Contributions from '../Contributions/Contributions'
import { GoogleLogin } from 'react-google-login';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      currentProject : {}
    };
  }

  updateUser = (user) => {
    this.setState({
      currentUser: user
    }) 
  }

  logOutUser = () => {
    this.setState({
      currentUser: {}
    })
  }

  updateProject = (project) => {
    this.setState({
      currentProject: project
    })
  }

  render() {
    const currentUser = this.state.currentUser;
    return (
      <div className="App">
         <Route exact path= '/' component={WelcomePage} />
         <Route exact path= '/CreateUser' render={({history}) => 
           <CreateUser updateUser={this.updateUser} history={history}/>
        } />
         <Route exact path = '/CreateUserGoogle' render={({history}) => 
           <CreateUserGoogle updateUser={this.updateUser} history={history}/>
         } />
         <Route exact path= '/Landing' render={() => 
           <Landing currentUser={currentUser} logOutUser={this.logOutUser} updateProject={this.updateProject}/>
         } />
         <Route exaxt path= '/SignIn' render={({history}) => 
          <SignIn currentUser={currentUser} updateUser={this.updateUser} history={history}/>
         } />
         <Route exact path= '/CreateProject' render={() => 
          <CreateProject currentUser={currentUser}/>
        }/>
        <Route exact path= '/UserProjects' render={() => 
          <UserProjects currentUser={currentUser}/>
        }/>
        <Route exact path= '/Contributions' render={({history}) => 
         <Contributions currentProject={this.state.currentProject} updateproject={this.updateproject}/>
      } />
      </div>
    );
  }
}

export default withRouter(App);
