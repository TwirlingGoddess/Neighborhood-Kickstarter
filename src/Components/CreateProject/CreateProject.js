import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CreateProject.css';
import deleteButton from '../../images/x-button.svg';
import { postNewProject } from '../../utilities/apiCalls/apiCalls';
import PropTypes from 'prop-types';
import Amplify, { Analytics, Storage } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { S3Album } from 'aws-amplify-react';
Amplify.configure(aws_exports);
Storage.configure({ level: 'private' });


class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      currentUserId:'',
      title: '',
      description: '',
      newResource: '',
      resources: [],
      photo: ''
    };
  }

  componentDidMount = () => {
    Analytics.record('Amplify_CLI');
    this.updateCurrentUser();
  }

  updateCurrentUser = () => {
    let currentUserId = this.props.currentUser.id;

    if (currentUserId) {
      this.setState({
        currentUserId
      });
    }
    return; 
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.className === 'submit-project-button') {
      const { title, description, resources, currentUserId } = this.state; 

      const newProject = {
        project: {
          title,
          description,
          photo: `https://s3.us-east-2.amazonaws.com/ndahood2911e331951b4151a9ac01eef641ebc8/private/us-east-2%3A211dbd01-1c6e-45db-81b0-1fcc811e5481/${this.state.filename}`,
          resources
        }
      };

      await postNewProject(newProject, currentUserId);

      this.setState({
        title: '',
        description: '',
        newResource: '',
        resources: []
      });
    }
    return;
  }

  addResource = (event, resource) => {
    event.preventDefault();

    if (event.target.className === 'add-material-button') {
      let newResource = {name: resource};
      let resources = [...this.state.resources, newResource];
  
      this.setState({
        resources, 
        newResource: ''
      });
    }
  }

  deleteMaterial = (item) => {
    let resources = this.state.resources.filter(resource => {
      return resource.name !== item;
    });
    
    this.setState({
      resources
    });
  }

  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ photo: name });
    })
  }

  render() {
    return (
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
            <button className='add-material-button' onClick={(event) => this.addResource(event, this.state.newResource)}>Add Resource</button>
            <label>Pick An Image</label>
            <input 
              type="file" 
              onChange={this.uploadFile} 
            />
            <button className='submit-project-button' onClick={this.handleSubmit}>Submit Project</button>
          </form>
          <div className='listed-materials'>
            <h1>Materials Needed:</h1>
            {this.state.resources.map((resource, index) => {
              return <div 
                key={index}
                className='list-item'>{`${index+1}. ${resource.name}`}
                <img onClick={() => this.deleteMaterial(resource.name)} alt='remove button' className='delete-material' src={deleteButton}/>
              </div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

CreateProject.propTypes = {
  currentUser: PropTypes.object
};

export default CreateProject;