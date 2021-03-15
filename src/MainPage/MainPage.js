import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIContext from '../APIContext';
import './MainPage.css';

class MainPage extends Component {
  static contextType = APIContext;

  render() {
    return (
        <section className='MainPage'>
            
        </section>
    );
  }
};

export default withRouter(MainPage);
