import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Select from 'react-select';
import Search from'../Search/Search';
import { ProjectsContainer } from '../ProjectsContainer/ProjectsContainer';
import { getNeighborhoods, getNeighborhoodProjectsById, getProjects } from '../../utilities/apiCalls/apiCalls'
import './Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      neighborhood: '',
      neighborhoods: [],
      projects: []
    }
  }
  
  componentDidMount = () => {
    this.updateUser();
    this.setNeighborhoods();
    this.updateProjects();
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
      console.log(neighborhoodProjects.projects)
      console.log(neighborhoodId.id)
      
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
          <ProjectsContainer projects={this.state.projects}/>
        </div>
      )
    }
    return (
      <div className='landing-page'>
        <div className='user-buttons-section'>
          <NavLink className='user-link-buttons' to=''>View My Projects</NavLink>
          <NavLink className='user-link-buttons' to=''>View Contributions</NavLink>
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
          <ProjectsContainer projects={this.state.projects}/>
     </div>
    )
  }
}

export default Landing;