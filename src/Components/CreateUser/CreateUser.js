import React, { Component } from 'react';
import './CreateUser.css'

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      neighborhood: ''
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
      firstName:'',
      lastName: '',
      email: '',
      password: ''
    })
  }

  render() {
    return (
      <div className='create-user-section'>
        <form className='create-user-form' onSubmit={this.handleSubmit}>
          <h1>Create Account</h1>
          <input
            className='input-fields first-name-input'
            name='firstName'
            type='text'
            value={this.state.firstName}
            placeholder='first name'
            onChange={this.handleChange}
          />
          <input 
            className='input-fields last-name-input'
            name='lastName'
            type='text'
            value={this.state.lastName}
            placeholder='last name'
            onChange={this.handleChange}
          />
          <input 
            className='input-fields email-input'
            name='email'
            type='email'
            value={this.state.email}
            placeholder='email'
            onChange={this.handleChange}
          />
          <input 
            className='input-fields password-input'
            name='neighborhood'
            type='text'
            value={this.state.neighborhood}
            placeholder='Select your neighborhood'
            onChange={this.handleChange}
          />
          <button className='sign-up-button'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default CreateUser