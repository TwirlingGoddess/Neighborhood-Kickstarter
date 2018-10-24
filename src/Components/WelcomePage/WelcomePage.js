import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './WelcomePage.css'

class WelcomePage extends Component {
  constructor() {
    super()
    this.state = ''
  }
  render() {
    return(
      <div className='user-link-section'>
        <NavLink className='user-link' to='/Landing'>View Projects</NavLink>
        <NavLink className='user-link' to='/CreateUser'>Create User</NavLink>
        <NavLink className='user-link' to='/SignIn'>Sign In</NavLink>
      </div>
    )
  }
}

export default WelcomePage