import React, { Component } from 'react';
import './Search.css'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({
      value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.value);
    this.setState({
      value: ''
    })
  }
  render() {
    return(
      <div className='Search'>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} placeholder='Enter your neighborhood' onChange={this.handleChange}/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default Search