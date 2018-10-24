import React, { Component } from 'react';
import Search from'../Search/Search';
import { ProjectsContainer } from '../ProjectsContainer/ProjectsContainer';
import './Landing.css'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: ''
    }
  }
  
  render() {
    return(
      <div className='landing-page'>
        <h1>Landing</h1>
        <Search />
        <ProjectsContainer />
      </div>
    )
  }
}

export default Landing