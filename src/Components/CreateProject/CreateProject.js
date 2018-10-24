import React, { Component } from 'react';
import './CreateProject.css'

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: '',
      projectDescription: '',
      materials: [],
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      projectName: '',
      projectDescription: '',
      materials: []
    })
  }

  addMateriall = () => {
    
  }

  render() {
    return(
      <div className='create-project-section'>
        <form className='create-project-form' onSubmit={this.handleSubmit}>
          <input
            name='projectName'
            type='text'
            placeholder='Project Name'
            value={this.state.projectName}
            onChange={this.handleChange}
          />
          <textarea
            name='projectDescription'
            type='text'
            placeholder='Project description:'
            value={this.state.projectDescription}
            onChange={this.handleChange}
          />
          <button>Submit Project</button>
        </form>
      </div>
    )
  }
}

export default CreateProject;