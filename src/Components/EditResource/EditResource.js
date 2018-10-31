import React, { Component } from 'react';
import './EditResource.css'
import check from '../../images/checked.svg'

class EditResource extends Component {
  constructor() {
    super();
    this.state = {
      completed: ''
    }
  }

  componentDidMount = () => {
    this.getResourceStatus()
  }

  getResourceStatus = () => {
    let completed;
    if(this.props.resource.status === 'fulfilled') {
      completed = 'fulfilled'
    } else {
      completed = 'unfulfilled'
    }
    this.setState({
      completed
    })
  }

  switchStatus = (resource) => {
    let completed;
    if (this.state.completed === 'fulfilled') {
      completed = 'unfulfilled'
    } else if (this.state.completed === 'unfulfilled') {
      completed = 'fulfilled'
    }
    
    this.setState({
      completed
    })
    this.props.updateResources(resource, completed)
  }

  render() {
    let { name, status } = this.props.resource
    return (
      <div className='edit-resource' onClick={() => this.switchStatus(this.props)}>
        <h1>{name}</h1>
        {this.state.completed === 'fulfilled' ? <img className='check-button' src={check}/> : <h1>Status: {status}</h1>}
      </div>
    )
  }
}

export default EditResource