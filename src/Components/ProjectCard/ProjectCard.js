import React, { Component } from 'react';
import './ProjectCard.css';

class ProjectCard extends Component {
  constructor() {
    super()
    this.state = ''
  }
  render() {
    const { name, owner, email, description, materials } = this.props
    return(
      <div className='Card'>
        <h2>{name}</h2>
        <h3>{owner}</h3>
        <h4>{email}</h4>
        <h5>{description}</h5>
        <h6>{materials}</h6>
      </div>
    )
  }
}

export default ProjectCard