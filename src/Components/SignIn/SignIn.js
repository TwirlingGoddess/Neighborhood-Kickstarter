import React, { Component } from 'react'

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      userName: '',
      password: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name='userName'
            type='text'
            placeholder='user name'
            value={this.state.userName}
            onChange={this.handleChange}
          />
          <input
            name='password'
            type='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Sign In</button>
        </form>
      </div>
    )
  }
}
export default SignIn