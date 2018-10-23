import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';
import CreateUser from '../CreateUser/CreateUser';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Route exact path= '/' component={WelcomePage} />
         <Route exact path= '/CreateUser' component={CreateUser} />
      </div>
    );
  }
}

export default App;
