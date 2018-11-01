import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ProjectCard.css';
import PropTypes from 'prop-types';

class ProjectCard extends Component {
  
  viewComments = (project) => {
    this.props.selectProject(project);
  }

  render() {
    const { title, neighbor, contact, description, photo, resources, first_name, last_name, email } = this.props;
    if (title) {
      return (
        <div className='Card'>
          <img className='project-image' src={photo} alt='uploaded view of the project'/>
          <h2>project: {title}</h2>
          <h3>neighbor: {neighbor ? neighbor : first_name + ' ' + last_name}</h3>
          <h4>contact: {contact ? contact : email}</h4>
          <h5>description: {description}</h5>
          <h5>resources: </h5>
          {resources.map((resource, index) => {
            return <h5 key={index}>{resource.name}</h5>;
          })}
          <NavLink className='comments-button' onClick={() => this.viewComments(this.props)} to='/Contributions'>Comments</NavLink>
        </div>
      );
    } else {
      return (
        <div>
          <h1>No Projects for this neighborhood</h1>
        </div>
      );
    }
  }
}

ProjectCard.propTypes = {
  selectProject: PropTypes.func,
  title: PropTypes.string,
  neighbor: PropTypes.string,
  contact: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.string,
  resources: PropTypes.array,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string
};

export default ProjectCard;