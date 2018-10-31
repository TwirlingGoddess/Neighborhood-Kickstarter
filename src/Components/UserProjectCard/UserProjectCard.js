import React, { Component } from 'react';
import './UserProjectCard.css';
import PropTypes from 'prop-types';

class UserProjectCard extends Component {
  constructor() {
    super();
    this.state = '';
  }

  handleClick = (project) => {
    this.props.selectProject(project);
  }

  render() {
    const { title, description, photo, resources } = this.props;
    if (title) {
      return (
        <div className='selected-project-card'>
          <img className='project-image' src={photo} alt='view  of the project'/>
          <h2>project: {title}</h2>
          <h5>description: {description}</h5>
          {resources.map((resource, index) => {
            return <h5 key={index}>{resource.name}</h5>;
          })}
          <button className='edit-project-button' onClick={() => this.handleClick(this.props)}>Edit Project</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>No Projects Created</h1>
        </div>
      );
    }
  }
}
UserProjectCard.propTypes = {
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

export default UserProjectCard;