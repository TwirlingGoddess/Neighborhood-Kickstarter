import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { getAllUsers, addNewUser, addNewUserLocal } from '../../utilities/apiCalls/apiCalls';
import './SignIn.css';
import PropTypes from 'prop-types';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      allUsers: []
    };
  }

  componentDidMount = () => {
    this.setUsers();
  }

  setUsers = async () => {
    let allUsers = await getAllUsers();
    this.setState({
      allUsers
    });
  }

  getCurrentUser = async (id, email) => {
    let user = {password: id, email};
  
    let foundUser = await addNewUser(user);

    if (foundUser.id) {
      this.props.updateUser(foundUser);
      this.props.history.push('/Landing');
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmitLogin = async (event) => {
    event.preventDefault();
    let { userName, password } = this.state; 
    let user = {username: userName, password};

    let foundUser = await addNewUserLocal(user);

    if (foundUser.id) {
      this.props.updateUser(foundUser);
      this.props.history.push('/Landing');
    }
  }

  responseGoogle = async (response) => {
    let email = response.profileObj.email;
    this.getCurrentUser(response.profileObj.googleId, email);
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
    );
  }
}

SignIn.propTypes = {
  updateUser: PropTypes.func,
  history: PropTypes.array
};

export default SignIn;