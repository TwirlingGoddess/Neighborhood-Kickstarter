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
        <h2>project: {name}</h2>
        <h3>neighbor: {owner}</h3>
        <h4>contact: {email}</h4>
        <h5>description: {description}</h5>
        <h5>needs: {materials[0]}, {materials[1]}, {materials[2]}</h5>
      </div>
    )
  }
}

export default ProjectCard