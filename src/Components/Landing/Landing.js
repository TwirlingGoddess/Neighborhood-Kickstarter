import React, { Component } from 'react';
import Search from'../Search/Search';
import { ProjectsContainer } from '../ProjectsContainer/ProjectsContainer';

class Landing extends Component {
  constructor() {
    super()
    this.state = ''
  }
  
  render() {
    return(
      <div className='Landing'>
        <h1>Landing</h1>
        <Search />
        <ProjectsContainer />
      </div>
    )
  }
}

export default Landing