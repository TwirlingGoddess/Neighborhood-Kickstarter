import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CreateProject.css';
import deleteButton from '../../images/x-button.svg';
import { postNewProject } from '../../utilities/apiCalls/apiCalls';

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

  handlePhoto = async (event) => {
    const image = event.target.files[0]

    const xmlImage = `
    <Contents>
        <Key>Screen Shot 2018-05-01 at 12.24.10 PM copy.png</Key>
        <LastModified>2018-10-31T21:48:52.000Z</LastModified>
        <ETag>&quot;45edc57f143cf68cc42c3b1a0341958f&quot;</ETag>
        <Size>521651</Size>
        <StorageClass>STANDARD</StorageClass>
    </Contents>
    `
    const url = 'http://neighbor-hub-images.s3.amazonaws.com'
    const settings = {
      method: 'POST'
      ,
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
        },
      body: xmlImage
    }

    try{
      const response = await fetch(url, settings);
      console.log(response)
      const data = await response.text();
      console.log(data)
      const string = await (new window.DOMParser()).parseFromString(data, "text/xml")
      console.log(string)

        if (response.ok) {
          console.log(response)
            // return response
        } else {
            console.log('response is not ok')
        }
    } catch (error) {
        console.log(error.message)
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
            <label htmlFor="choose-file" className="file-label">Upload Image</label>
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