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
                <img id='mainPageImage' alt='Magic 8-Ball' src='https://user-images.githubusercontent.com/58446465/111224986-6c1a7e00-859c-11eb-8453-d206838bbbe3.png' />
                <h2 id='mainPageHeader'>The 8-Ball Knows All!</h2>
            </div>
            <InputForm />
        </section>
    );
  }
};

export default withRouter(MainPage);
