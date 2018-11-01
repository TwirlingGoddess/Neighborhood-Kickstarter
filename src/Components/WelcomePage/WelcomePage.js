import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './WelcomePage.css';

class WelcomePage extends Component {
  constructor() {
    super();
    this.state = {
      loggingIn: false
    };
  }

  handleLogin = () => {
    let loggingIn = !this.state.loggingIn;
    
    this.setState({
      loggingIn
    }); 
  }

  render() {
    if (this.state.loggingIn) {
      return (
        <div className='user-link-section'>
          <NavLink className='user-link signin' to='/CreateUserGoogle'>Sign In with Google</NavLink>
          <NavLink className='user-link signin' to='/CreateUser'>Create Account With Us</NavLink>
        </div>
      );
    }
    return (
      <div className='user-link-section'>
        <NavLink className='user-link' to='/Landing'>View Projects</NavLink>
        <NavLink className='user-link' to='/SignIn'>Sign In</NavLink>
        <button onClick={this.handleLogin} className='user-link' to='/SignIn'>Create Account</button>
      </div>
    );
  }
}

export default WelcomePage;