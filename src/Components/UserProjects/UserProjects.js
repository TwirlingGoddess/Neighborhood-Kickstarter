import React, { Component } from 'react';
import { UserProjectsContainer } from '../UserProjectsContainer/UserProjectsContainer'
import { getUserProjects } from '../../utilities/apiCalls/apiCalls'
import './UserProjects.css'

class UserProjects extends Component {
  constructor() {
    super();
    this.state = {
      userProjects: [],
      selectedProject: {}
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
      console.log(userProjects)
  
      this.setState({
        userProjects
      })
    }
  }

  selectProject = (selectedProject) => {
    console.log(selectedProject)
    this.setState({
      selectedProject
    })
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
            <h1>edit</h1>
          </div>
        </div>
      )
    }
  }
}

export default UserProjects;