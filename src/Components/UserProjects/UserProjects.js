import React, { Component } from 'react';
import { UserProjectsContainer } from '../UserProjectsContainer/UserProjectsContainer';
import { getUserProjects, editPostedProject } from '../../utilities/apiCalls/apiCalls';
import EditResource from '../EditResource/EditResource';
import './UserProjects.css';
import PropTypes from 'prop-types';

class UserProjects extends Component {
  constructor() {
    super();
    this.state = {
      userProjects: [],
      selectedProject: {}, 
      editedResources: []
    };
  }

  componentDidMount = () => {
    if (this.state.userProjects.length)  {
      return; 
    }
    this.getUserProjects();
  }

  getUserProjects = async () => {
    let userId = this.props.currentUser.id;

    if (userId) {
      let userProjects = await getUserProjects(userId);
  
      this.setState({
        userProjects
      });
    }
  }

  selectProject = (selectedProject) => {
    this.setState({
      selectedProject
    });
  }

  updateResources = (editedResource, completed) => {
    let status = completed;

    let editedResources = this.state.selectedProject.resources.map(resource => {
      if (resource.id === editedResource.resource.id) {
        resource.status = status;
      }
      return editedResources;
    });
  }

  patchResources = async () => {
    let { title, description, photo, resources, id } = this.state.selectedProject;

    let editedProject = {
      project: {
        title,
        description,
        photo, 
        resources
      }
    };
    await editPostedProject(editedProject, id);
    this.props.history.push('/Landing')
  }
  
  render() {
    let currentUser = this.props.currentUser;
    let { description, title, resources, photo } = this.state.selectedProject;
    
    if (!this.state.selectedProject.id) {
      return (
        <div className='user-selected-projects-section'>
          <UserProjectsContainer userProjects={this.state.userProjects} selectProject={this.selectProject} currentUser={currentUser}/>
        </div>
      );
    } else {
      return (
        <div className='edit-project-section'>
          <div className='edit-selected-project'>
            <div className='edit-project-info'>
              <h1 className='selected-info'>project</h1>
              <img className='project-photo' src={photo} alt='a pic of a project uploaded'/> 
              <h2 className='selected-info'>Title: {title}</h2>
              <h2 className='selected-info'>Description: {description}</h2>
              <h2 className='selected-info'>Resources:</h2>
              <div className='selected-info-resources'>
                {resources.map((resource, index) => {
                  return <h1 key={index}>{resource.name}</h1>;    
                })}
              </div>
            </div>
          </div>
          <div className='edit-resources'>
            <h1>Resources</h1>
            {this.state.selectedProject.resources.map((resource, index) => {
              return <div className='resources' key={index}>  
                <EditResource updateResources={this.updateResources} resource={resource}/>
              </div>;
            })}
            <button className='edit-resource-button' onClick={this.patchResources}>Submit Resources</button>
          </div>
        </div>
      );
    }
  }
}

UserProjects.propTypes = {
  currentUser: PropTypes.object
};

export default UserProjects;