import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({
      value
    })
  }
    render() {
    return(
      <div>
        <h3>Search:</h3>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} placeholder='Enter your location' onChange={this.handleChange}/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default Search