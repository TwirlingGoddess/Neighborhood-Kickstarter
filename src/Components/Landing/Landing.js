import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Select from 'react-select';
import { ProjectsContainer } from '../ProjectsContainer/ProjectsContainer';
import { getNeighborhoods, getNeighborhoodProjectsById, getProjects, getAllUsers } from '../../utilities/apiCalls/apiCalls';
import './Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      neighborhood: '',
      neighborhoods: [],
      projects: [],
      allUsers: []
    }
  }
  
  componentDidMount = () => {
    this.updateUser();
    this.setNeighborhoods();
    this.updateProjects();
    this.getAllUsers();
  }

  updateUser = () => {
    if(this.props.currentUser.first_name) {
      this.setState({
        currentUser: this.props.currentUser,
        neighborhood: this.props.currentUser.neighborhood
      })
    }
    return 
  }

  getAllUsers = async () => {
    let allUsers = await getAllUsers()

    this.setState({
      allUsers
    })
  }

  logOut = () => {
    this.props.logOutUser();
  }

  
  setNeighborhoods = async () => {
    if(!this.state.neighborhoods.length) {
      
      let response = await getNeighborhoods();
  
      let neighborhoods = response.map(neighborhood => {
        return { value: neighborhood.name, label: neighborhood.name, id: neighborhood.id }
      })

      this.setState({
        neighborhoods
      })
    }

    if(this.state.neighborhood) {

      let neighborhoodId = this.state.neighborhoods.find(neighborhood => {
        return neighborhood.value === this.state.neighborhood
      })
      let neighborhoodProjects = await getNeighborhoodProjectsById(neighborhoodId.id)
      
      this.setState({
        projects: neighborhoodProjects.projects
      })
    }
  }

  handleSelectChange = (selectedOption) => {
    let neighborhood = selectedOption.value;
    this.setState({
      neighborhood
    },() => this.setNeighborhoods())
  }

  updateProjects = async () => {
    if(!this.state.currentUser.first_name) {
      let allProjects = await getProjects();

      this.setState({
        projects: allProjects
      })
    }
    this.setNeighborhoods();
  }

  viewAllProjects = async () => {
    let allProjects = await getProjects();
    
    this.setState({
      projects: allProjects
    })
  }

  selectProject = (project) => {
    this.props.updateProject(project);
  }
  
  render() {
    const name = this.state.currentUser.first_name;

    if(!name) {
      return (
        <div className='landing-page'>
          <Select
            className='select-input' 
            placeholder='Search a neighborhhod for projects'
            value={this.state.neighborhood}
            onChange={this.handleSelectChange}
            options={this.state.neighborhoods}
          />
          <ProjectsContainer projects={this.state.projects} allUsers={this.state.allUsers}/>
        </div>
      )
    }
    return (
      <div className='landing-page'>
        <div className='user-buttons-section'>
          <button className='user-link-buttons' onClick={this.viewAllProjects}>View All Projects</button>
          <NavLink className='user-link-buttons' to='UserProjects'>View My Projects</NavLink>
          <NavLink className='user-link-buttons' to='/CreateProject'>Create A Project</NavLink>
          <NavLink onClick={this.logOut} className='user-link-buttons sign-out' to='/'>Log Out</NavLink>
        </div>
          <h1 className='welcome-header'>Welcome {name}</h1>
          <Select
            className='select-input' 
            placeholder={`Projects in ${this.state.neighborhood}`}
            value={this.state.neighborhood}
            onChange={this.handleSelectChange}
            options={this.state.neighborhoods}
          />
          <ProjectsContainer projects={this.state.projects} selectProject={this.selectProject} allUsers={this.state.allUsers}/>
     </div>
    )
  }
}

export default Landing;