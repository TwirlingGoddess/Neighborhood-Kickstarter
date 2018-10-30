import React, { Component } from 'react';
import { UserProjectsContainer } from '../UserProjectsContainer/UserProjectsContainer'
import { getUserProjects, editPostedProject } from '../../utilities/apiCalls/apiCalls'
import EditResource from '../EditResource/EditResource'
import './UserProjects.css'

class UserProjects extends Component {
  constructor() {
    super();
    this.state = {
      userProjects: [],
      selectedProject: {}, 
      editedResources: []
    }
  }

  componentDidMount = () => {
    if(this.state.userProjects.length)  {
      return 
    }
    this.getUserProjects();
  }

  getUserProjects = async () => {
    let userId = this.props.currentUser.id;

    if(userId) {
      let userProjects = await getUserProjects(userId);
  
      this.setState({
        userProjects
      })
    }
  }

  selectProject = (selectedProject) => {
    this.setState({
      selectedProject
    })
  }

  updateResources = (editedResource, completed) => {
    let status = completed;

    let editedResources = this.state.selectedProject.resources.map(resource => {
      if(resource.id === editedResource.resource.id) {
        resource.status = status
      }
      return editedResources
    })
  }

  patchResources = async () => {
    let { title, description, photo, resources, id} = this.state.selectedProject;

    let editedProject = {
      project: {
        title,
        description,
        photo, 
        resources
      }
    }
    await editPostedProject(editedProject, id)
  }
  
  render() {
    if(!this.state.selectedProject.id) {
      return (
        <div className='user-projects-section'>
          <UserProjectsContainer userProjects={this.state.userProjects} selectProject={this.selectProject}/>
        </div>
      )
    } else {
      return (
        <div className='edit-project-section'>
          <div className='selected-project'>
            <h1>project</h1>
          </div>
          <div className='edit-resources'>
            <h1>Resources</h1>
            {this.state.selectedProject.resources.map((resource, index) => {
              return <div className='resources' key={index}>  
                       <EditResource updateResources={this.updateResources} resource={resource}/>
                     </div>
            })}
            <button onClick={this.patchResources}>Submit Resources</button>
          </div>
        </div>
      )
    }
  }
}

export default UserProjects;