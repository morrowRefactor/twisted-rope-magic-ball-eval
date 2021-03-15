import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import APIContext from '../APIContext';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    };
  };

  render() {
    const contVal = {
      loading: this.state.loading
    };

    return (
      <APIContext.Provider value={contVal}>
        <div className="App">
            <Route 
              exact
              path='/'
              component={MainPage}
            />
        </div>
      </APIContext.Provider>
    );
  }
};

export default withRouter(App);
