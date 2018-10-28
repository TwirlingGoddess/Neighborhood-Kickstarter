import React, { Component } from 'react';
import './ProjectCard.css';

class ProjectCard extends Component {
  constructor() {
    super()
    this.state = ''
  }
  render() {
    const { title, email, description, photo, resources } = this.props;
    if(title) {
      return (
        <div className='Card'>
          <img className='project-image' src={photo} alt='picture of the project'/>
          <h2>project: {title}</h2>
          <h3>neighbor: </h3>
          <h4>contact: </h4>
          <h5>description: {description}</h5>
          {/* {resources.map((resource, index) => {
            return <h5 key={index}>{resource.name}</h5>
          })} */}
        </div>
      )
    } else {
      return (
        <div>
          <h1>No Projects for this neighborhood</h1>
        </div>
      )
    }
  }
}

export default ProjectCard