import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import { getUser, getAllUsers } from '../../utilities/apiCalls/apiCalls'
import './SignIn.css'

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      allUsers: []
    }
  }

  componentDidMount = () => {
    this.setUsers();
  }

  setUsers = async () => {
    let allUsers = await getAllUsers();
    this.setState({
      allUsers
    })
  }

  getCurrentUser = (token) => {
    let foundUser = this.state.allUsers.find(user => {
      return user.token === token
    })
    if(foundUser) {
      this.props.updateUser(foundUser)
      this.props.history.push('/Landing')
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    // let foundUser = this.state.allUsers.find(user => {
    //   return user
    // })

    this.setState({
      [name]: value
    })
  }

  handleSubmitLogin = (event) => {
    event.preventDefault();
    this.setState({
      userName: '',
      password: ''
    })
  }

  responseGoogle = async (response) => {
    let googleSignIn = {
      token: response.accessToken
    };

    this.getCurrentUser(response.profileObj.googleId)
  }

  render() {
    return (
      <div className='sign-in-section'>
        <form className='sign-in-form' onSubmit={this.handleSubmit}>
          <h1>Sign In</h1>
          <input
            className='signin-input-fields'
            name='userName'
            type='text'
            placeholder='user name'
            value={this.state.userName}
            onChange={this.handleChange}
          />
          <input
            className='signin-input-fields'
            name='password'
            type='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmitLogin} className='sign-in-button'>Sign In</button>
          <span>OR</span>
          <GoogleLogin
            clientId="603748791729-1qgv1pg7tl426jut42re2tnub34nu0hu.apps.googleusercontent.com"
            buttonText="Login with Google"
            onClick={this.responseGoogle}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </form>
      </div>
    )
  }
}
export default SignIn