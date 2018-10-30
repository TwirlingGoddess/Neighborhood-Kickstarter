import React, { Component } from 'react';
import Select from 'react-select';
import GoogleLogin from 'react-google-login';

import { getNeighborhoods, addNewUser } from '../../utilities/apiCalls/apiCalls'

import './CreateUserGoogle.css'

class CreateUserGoogle extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      neighborhood: '',
      neighborhoods: []
    }
  }

  componentDidMount = () => {
    this.setNeighborhoods();
  }

  responseGoogle = async (response) => {
    let { updateUser } = this.props;
    let googleSignIn = {
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      email: response.profileObj.email,
      username: this.state.userName,
      district_id: this.state.neighborhood.id,
      password: response.profileObj.googleId
    };
    
    const user = await addNewUser(googleSignIn);

    if (user.id) {
      updateUser(user);
      this.props.history.push('/Landing')
    }
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

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      userName: '',
      neighborhood: ''
    })

    this.props.history.push('/Landing')
  }

  render() {
    return (
      <div className='create-user-section'>
        <form className='create-user-form-google' onSubmit={this.handleSubmit}>
          <h1>Create Account</h1>
          <input
            className='input-fields-google'
            name='userName'
            type='text'
            value={this.state.userName}
            placeholder='User Name'
            onChange={this.handleChange}
          />
          <Select
            className='select-input' 
            placeholder='Select your neighborhood'
            value={this.state.neighborhood}
            onChange={this.handleSelectChange}
            options={this.state.neighborhoods}
          />
          <GoogleLogin
            clientId="603748791729-1qgv1pg7tl426jut42re2tnub34nu0hu.apps.googleusercontent.com"
            buttonText="Login with Google"
            onClick={this.responseGoogle}
            disabled={this.state.neighborhood && this.state.userName ? false : true}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </form>
      </div>
    )
  }
}

export default CreateUserGoogle