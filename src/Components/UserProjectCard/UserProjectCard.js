import React, { Component } from 'react';
import './UserProjectCard.css'

class UserProjectCard extends Component {
  constructor() {
    super()
    this.state = ''
  }

  handleClick = (project) => {
    this.props.selectProject(project)
  }

  render() {
    const { title, neighbor, description, photo, resources } = this.props;
    if(title) {
      return (
        <div className='selected-project-card'>
          <img className='project-image' src={photo} alt='picture of the project'/>
          <h2>project: {title}</h2>
          <h5>description: {description}</h5>
          {resources.map((resource, index) => {
            return <h5 key={index}>{resource.name}</h5>
          })}
          <button className='edit-project-button' onClick={() => this.handleClick(this.props)}>Edit Project</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>No Projects Created</h1>
        </div>
      )
    }
  }
}

export default UserProjectCard