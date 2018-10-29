import React, { Component } from 'react';
import { UserProjectsContainer } from '../UserProjectsContainer/UserProjectsContainer'
import { getUserProjects } from '../../utilities/apiCalls/apiCalls'

class UserProjects extends Component {
  constructor() {
    super();
    this.state = {
      userProjects: []
    }
  }

  componentDidMount = () => {
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
  
  render() {
    return (
      <div className='user-projects-section'>
        <UserProjectsContainer userProjects={this.state.userProjects}/>
      </div>
    )
  }
}

export default UserProjects;