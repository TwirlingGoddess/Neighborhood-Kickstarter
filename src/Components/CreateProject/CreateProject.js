import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CreateProject.css';
import deleteButton from '../../images/x-button.svg';
import { postNewProject } from '../../utilities/apiCalls/apiCalls';
import axios from 'axios';

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      currentUserId:'',
      title: '',
      description: '',
      newResource: '',
      resources: [],
      photo: null,
    }
  }

  componentDidMount = () => {
    this.updateCurrentUser();
  }

  updateCurrentUser = () => {
    let currentUserId = this.props.currentUser.id;
    console.log(currentUserId)

    if(currentUserId) {
      this.setState({
        currentUserId
      })
    }
    return 
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if(event.target.className === 'submit-project-button') {
      const { title, description, resources, currentUserId, photo} = this.state; 

      const newProject = {
        project: {
          title,
          description,
          photo,
          resources
        }
      };
      console.log(newProject)

      await postNewProject(newProject, currentUserId);

      this.setState({
        title: '',
        description: '',
        newResource: '',
        resources: [],
        photo: null,
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

  handlePhoto = (event) => {
    this.setState({
      photo: event.target.files[0]
    })
    this.photoUploadHandler()
  }

  photoUploadHandler = () => {
    const formData = new FormData();
    formData.append('image', this.state.photo, this.state.photo.name)
    axios.post('https://us-central1-fir-demo-85716.cloudfunctions.net/uploadFile')
      .then(res => {
        console.log(res)
      })
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
        <NavLink className='view-projects-button' to='/Landing'>View Projects</NavLink>
        <div className='main-section'>
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
            <label for="choose-file" class="file-label">Upload Image</label>
            <input 
              className="choose-file" 
              type="file"
              value=''
              onChange={this.handlePhoto}
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
      </div>
    )
  }
}

export default CreateProject;