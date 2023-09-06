import React, { Component } from 'react';
import spinner from './spinner.webp';

export class Spinner extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center align-items-centertext-center'>
        <img src={spinner} alt="loading" style={{width: '100px',height: '100px'}}/>
      </div>
    )
  }
}

export default Spinner


