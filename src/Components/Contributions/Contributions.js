import React, { Component } from 'react';
import { getProjectsComments, postNewComment } from '../../utilities/apiCalls/apiCalls'
import './Contributions.css'

class Contributions extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      selectedProject: {},
      projectComments: []
    }
  }

  componentDidMount = () => {
    this.setCurrentProject();
  }

  setCurrentProject = () => {
    if(this.props.currentProject.id) {
      let id = this.props.currentProject.id
      this.setState({
        selectedProject: this.props.currentProject
      },() => this.getProjectComments(id))
    }
    return 
  }

  getProjectComments = async () => {
    if(this.state.selectedProject.id) {
      let projectId = this.state.selectedProject.id;
  
      let projectComments = await getProjectsComments(projectId);

      this.setState({
        projectComments
      })
    }
    return 
  }

  handleChange = (event) => {
    let value = event.target.value;

    this.setState({
      comment: value
    })
  }

  handleSubmit = async () => {
    let user_id = this.props.currentUser.id;
    let projectId = this.props.currentProject.id;
    let newComment = {content: this.state.comment, user_id}

    await postNewComment(newComment, projectId);
    await this.getProjectComments()
    this.setState({
      comment: ''
    })
  }



  render () {
    let { contact, description, id, photo, resources, title, neighbor } = this.state.selectedProject;
    if(id) {
      return (
        <div className='project-comment-section'>
          <div className='project-section'>
            <img className='selected-image' src={photo} alt='picture of the project'/>
            <h2>title: {title}</h2>
            <h2>owner: {neighbor}</h2>
            <h2>contact: {contact}</h2>
            <h2>description: {description}</h2>
            <h2>needs:</h2>
            {resources.map((resource, index) => {
              return <h3 key={index}>{resource.name}</h3>
            })}
          </div>
          <div className='comment-section'>
            <button onClick={this.handleSubmit} className='submit-comment'>Submit Comment</button>
            <textarea
              className='add-comment-input'
              type='text'
              onChange={this.handleChange}
              placeholder='leave a comment'
              name='comment'
              value={this.state.comment}
            />
            <div className='comment-box'>
              <h1 className='comment-header'>Comments</h1>
              {this.state.projectComments.map((comment, index) => {
                return <div className='comment-div' key={index}>
                         <h2 className='comment-owner'>{comment.author} said:</h2>
                         <h2 className='comment'>{comment.content}</h2>
                      </div>
              })}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>no selected project</h1>
        </div>
      )
    }
  }
}

export default Contributions

// content: 'i got the wood', owner: 'Bobby'}, {content: 'ill bring the beer', owner: 'John'}

// contact: 'assas', description: 'cdscsdc', id: 1, photo: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/6c/23/9e/covered-bbq-area-and.jpg', resources: [{name: 'beer'}, {name: 'wood'}, {name: 'hammer'}, {name: 'screwdriver'}, {name: 'tape measure'}], title: 'assacd', neighbor: 'acds'
      // },