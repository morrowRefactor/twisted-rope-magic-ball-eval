import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import InputForm from '../InputForm/InputForm';
import APIContext from '../APIContext';
import './MainPage.css';

class MainPage extends Component {
  static contextType = APIContext;

  render() {
    return (
        <section className='MainPage'>
            <h1>Magic 8-Ball</h1>
            <div className='featureImage'>
                <img id='mainPageImage' alt='Magic 8-Ball' />
            </div>
            <InputForm />
        </section>
    );
  }
};

export default withRouter(MainPage);
