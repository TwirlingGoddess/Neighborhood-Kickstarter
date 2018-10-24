import React, { Component } from 'react';
import './CreateProject.css'
import deleteButton from '../../images/x-button.svg'

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: '',
      projectDescription: '',
      newMaterial: '',
      materials: []
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(event.target.className === 'submit-project-button') {
      this.setState({
        projectName: '',
        projectDescription: '',
        materials: []
      })
    }
    return
  }

  addMaterial = (event, material) => {
    event.preventDefault();
    if(event.target.className === 'add-material-button') {
      let newMaterial = {material};
      let materials = [...this.state.materials, newMaterial];
  
      this.setState({
        materials, 
        newMaterial: ''
      })
    }
  }

  render() {
    return(
      <div className='create-project-section'>
        <form className='create-project-form' onSubmit={this.handleSubmit}>
          <h1>Create Project</h1>
          <input
            className='project-inputs'
            name='projectName'
            type='text'
            placeholder='Project Name'
            value={this.state.projectName}
            onChange={this.handleChange}
          />
          <textarea
            className='project-inputs description'
            name='projectDescription'
            type='text'
            placeholder='Project description:'
            value={this.state.projectDescription}
            onChange={this.handleChange}
          />
          <textarea
            className='project-inputs materials'
            name='newMaterial'
            type='text'
            placeholder='Add new material'
            value={this.state.newMaterial}
            onChange={this.handleChange}
          />
          <button className='add-material-button' onClick={(event) => this.addMaterial(event, this.state.newMaterial)}>Add Material</button>
          <button className='submit-project-button'>Submit Project</button>
        </form>
        <div className='listed-materials'>
          <h1>Materials:</h1>
            {this.state.materials.map((material, index) => {
              return <div 
                      className='list-item'>{`${index+1}. ${material.material}`}
                      <img className='delete-material' src={deleteButton}/>
                    </div>
            })}
        </div>
      </div>
    )
  }
}

export default CreateProject;