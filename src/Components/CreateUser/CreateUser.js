import React, { Component } from 'react';
import Select from 'react-select';

import { getNeighborhoods } from '../../utilities/apiCalls/apiCalls'

import './CreateUser.css'

const options = [
  { value: 'Arvada', label: 'Arvada' },
  { value: 'Denver', label: 'Denver' },
  { value: 'Golden', label: 'Golden' }
];

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      neighborhood: '',
      neighborhoods: []
    }
  }

  componentDidMount = () => {
    this.setNeighborhoods()
  }

  setNeighborhoods = async() => {
    const neighborhoods = await getNeighborhoods()
    console.log(neighborhoods)
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSelectChange = (selectedOption) => {
    const neighborhood = selectedOption;
    this.setState({
      neighborhood
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      firstName:'',
      lastName: '',
      email: '',
      password: '',
      neighborhood: ''
    })
    this.props.history.push('/Landing')
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
          <Select
            className='select-input' 
            placeholder='Select your neighborhood'
            value={this.state.neighborhood}
            onChange={this.handleSelectChange}
            options={options}
          />
          {/* <input 
            className='input-fields password-input'
            name='neighborhood'
            type='text'
            value={this.state.neighborhood}
            placeholder='Select your neighborhood'
            onChange={this.handleChange}
          /> */}
          <button className='sign-up-button'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default CreateUser