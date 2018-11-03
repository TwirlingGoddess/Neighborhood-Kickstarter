import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CreateProject.css';
import deleteButton from '../../images/x-button.svg';
import { postNewProject } from '../../utilities/apiCalls/apiCalls';
import sha256 from 'crypto-js';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';

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
      string: 'AWS4-HMAC-SHA256'+
              '20181031T193600Z'+
              '20181031/us-west-1/neighbor-hub-images/aws4_request'+
              '9bef5cbf5aa49f5a70e769ad4e8271843f06a84ac9248dd49fd80f18f729874f'
    }
  }

  componentDidMount = () => {
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
      method: 'GET'
      ,
      headers: {
        Accept: 'application/xml',
        // 'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'If-Unmodified-Since': 'Wed, 21 Oct 2015 07:28:00 GMT',
        'If-None-Match': '*'

        }
    }

    try{
      const response = await fetch(url, settings);
      console.log(response)
      const data = await response.text();
      console.log(data)
      const string = await (new window.DOMParser()).parseFromString(data, "text/xml")
      console.log(string)
      console.log(string.childNodes[0].childNodes[5])

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
    });
    
    this.setState({
      resources
    });
  }

  getSignatureKey = (key, dateStamp, regionName, serviceName) => {
      var kDate = sha256.HmacSHA256(dateStamp, "AWS4" + key);
      var kRegion = sha256.HmacSHA256(regionName, kDate);
      var kService = sha256.HmacSHA256(serviceName, kRegion);
      var kSigning = sha256.HmacSHA256("aws4_request", kService);
      var signature = sha256.HmacSHA256(kSigning, this.state.string)
      const filteredSigs = signature.words.reduce((accu, element) => {
        return accu + `${element}`
      }, '')
      var hexicode = filteredSigs.toString(16)
      console.log(hexicode)
      this.setState({
        photo: hexicode
      })
      console.log(hexicode)
      return ;
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
            <label htmlFor="choose-file" className="file-label">Upload Image</label>
            <input 
              className="choose-file" 
              type="file"
              value=''
              onChange={this.handlePhoto} 
              action="http://neighbor-hub-images.s3.amazonaws.com/" 
              method="post" 
              encType="multipart/form-data"
            />
            <button className='add-material-button' onClick={(event) => this.addResource(event, this.state.newResource)}>Add Resource</button>
            <button className='submit-project-button' onClick={this.handleSubmit}>Submit Project</button>
          </form>

          <form action="http://neighbor-hub-images.s3.amazonaws.com/" method="post" encType="multipart/form-data" onClick={() => this.getSignatureKey('AKIAIXU4Q4Y4XZWUK4SQXJamJ4XXyyHKx0IeRfj05xd/585rx3aU5u7OKdam' , '20181031','us-west-1','aws4_request')}>
            <input type="input"  name="key" value="user/user1/${filename}" /><br />
            <input type="hidden" name="acl" value="public-read" />
            <input type="hidden" name="success_action_redirect" value="http://neighbor-hub-images.s3.amazonaws.com/successful_upload.html" />
            <input type="input"  name="Content-Type" value="image/jpeg" /><br />
            <input type="hidden" name="x-amz-meta-uuid" value="14365123651274" /> 
            <input type="hidden" name="x-amz-server-side-encryption" value="AES256" /> 
            <input type="text"   name="X-Amz-Credential" value="AKIAIXU4Q4Y4XZWUK4SQ/20151229/us-west-1/s3/aws4_request" />
            <input type="text"   name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256" />
            <input type="text"   name="X-Amz-Date" value="20181031T193600Z" />
            <input type="input"  name="x-amz-meta-tag" value="" /><br />
            <input type="hidden" name="Policy" value={this.state.string} />
            <input type="hidden" name="X-Amz-Signature" value={this.state.photo} />
            <input type="file"   name="file" /> <br />
            <input type="submit" name="submit" value="Upload to Amazon S3" placeholder="Upload to Amazon S3" />
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