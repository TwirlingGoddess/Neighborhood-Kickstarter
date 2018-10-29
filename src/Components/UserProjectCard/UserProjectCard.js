import React, { Component } from 'react';

class UserProjectCard extends Component {
  constructor() {
    super()
    this.state = ''
  }
  render() {
    const { title, neighbor, project_role, description, photo, resources } = this.props;
    if(title) {
      return (
        <div className='Card'>
          <img className='project-image' src={photo} alt='picture of the project'/>
          <h2>project: {title}</h2>
          <h3>neighbor: {neighbor}</h3>
          <h4>role {project_role}</h4>
          <h5>description: {description}</h5>
          {resources.map((resource, index) => {
            return <h5 key={index}>{resource.name}</h5>
          })}
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