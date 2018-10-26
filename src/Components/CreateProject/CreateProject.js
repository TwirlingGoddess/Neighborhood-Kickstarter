import React, { Component } from 'react';
import './CreateProject.css'
import deleteButton from '../../images/x-button.svg'
import { postNewProject } from '../../utilities/apiCalls/apiCalls'

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      currentUserId: 1,
      title: '',
      description: '',
      newResource: '',
      resources: []
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
      const { title, description, resources, currentUserId } = this.state; 

      const newProject = {
        title,
        description,
        photo: 'https://www.nycgovparks.org/photo_gallery/full_size/23026.jpg',
        resources
      };
      postNewProject(newProject, currentUserId);

      this.setState({
        title: '',
        description: '',
        newResource: '',
        resources: []
      })
    }
    return
  }

  addResource = (event, resource) => {
    event.preventDefault();
    if(event.target.className === 'add-material-button') {
      let newResource = {name: resource};
      let resources = [...this.state.resources, newResource];
  
      this.setState({
        resources, 
        newResource: ''
      })
    }
  }

  deleteMaterial = (item) => {
    let resources = this.state.resources.filter(resource => {
      return resource.name !== item;
    })
    this.setState({
      resources
    })
  }

  render() {
    return(
      <div className='create-project-section'>
        <form className='create-project-form'>
          <h1>Create Project</h1>
          <input
            className='project-inputs'
            name='title'
            type='text'
            placeholder='Project Name'
            value={this.state.title}
            onChange={this.handleChange}
          />
          <textarea
            className='project-inputs description'
            name='description'
            type='text'
            placeholder='Project description:'
            value={this.state.description}
            onChange={this.handleChange}
          />
          <textarea
            className='project-inputs materials'
            name='newResource'
            type='text'
            placeholder='Add new material'
            value={this.state.newResource}
            onChange={this.handleChange}
          />
          <button className='add-material-button' onClick={(event) => this.addResource(event, this.state.newResource)}>Add Resource</button>
          <button className='submit-project-button' onClick={this.handleSubmit}>Submit Project</button>
        </form>
        <div className='listed-materials'>
          <h1>Materials Needed:</h1>
            {this.state.resources.map((resource, index) => {
              return <div 
                      key={index}
                      className='list-item'>{`${index+1}. ${resource.name}`}
                      <img onClick={() => this.deleteMaterial(resource.name)} alt='remove button' className='delete-material' src={deleteButton}/>
                    </div>
            })}
        </div>
      </div>
    )
  }
}

export default CreateProject;