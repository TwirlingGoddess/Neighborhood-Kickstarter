import React, { Component } from 'react';
import Select from 'react-select';

import { getNeighborhoods, addNewUserLocal } from '../../utilities/apiCalls/apiCalls'

import './CreateUser.css'

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      allUsers: [],
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      neighborhood: '',
      neighborhoods: []
    }
  }

  componentDidMount = () => {
    this.setNeighborhoods();
  }

  setNeighborhoods = async() => {
    const response = await getNeighborhoods();

    const neighborhoods = response.map(neighborhood => {
      return { value: neighborhood.name, label: neighborhood.name, id: neighborhood.id }
    })

    this.setState({
      neighborhoods
    })
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

  handleSubmit = async(event) => {
    event.preventDefault();
    let {firstName, lastName, email, password, neighborhood, userName} = this.state;
    let { updateUser } = this.props;

    let localSignIn = {
      first_name: firstName,
      last_name: lastName,
      email,
      username: userName,
      district_id: neighborhood.id,
      password
    }
    console.log(localSignIn)

    let user = await addNewUserLocal(localSignIn)
    console.log(user)

    if (user) {
      updateUser(user)
      this.props.history.push('/Landing')
      // this.setState({
        //   firstName:'',
      //   lastName: '',
      //   email: '',
      //   userName: '',
      //   password: '',
      //   neighborhood: ''
      // })
    }
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
            className='input-fields'
            name='userName'
            type='text'
            value={this.state.userName}
            placeholder='user name'
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
            className='input-fields'
            name='password'
            type='text'
            value={this.state.password}
            placeholder='password'
            onChange={this.handleChange}
          />
          <Select
            className='select-input' 
            placeholder='Select your neighborhood'
            value={this.state.neighborhood}
            onChange={this.handleSelectChange}
            options={this.state.neighborhoods}
          />
          <button className='sign-up-button'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default CreateUser