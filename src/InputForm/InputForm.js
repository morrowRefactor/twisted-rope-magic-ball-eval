import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import APIContext from '../APIContext';
import config from '../config';
import './InputForm.css';

class InputForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props)
    this.state = {
        input: { value: '', touched: false },
        result: {},
        history: [],
        loading: false,
        showHistory: false,
        inputError: { value: '', status: false },
        apiError: { value: '', status: false }
    };
  };

  // update state with query input value
  updateInput = val => {
    this.setState({input: { value: val, touched: true }});
  };
  
  // validate input before calling API
  validateInput = e => {
    e.preventDefault();

    // clear any previous errors
    if(this.state.inputError.status === true || this.state.apiError.status === true) {
        this.setState({
            inputError: { 
                value: '', 
                status: false 
            },
            apiError: {
                value: '',
                status: false
            }
        });
    }

    // ensure that input is not blank and includes a quesiton mark
    const lengthCheck = this.state.input.value.trim();
    if(lengthCheck.length < 1 || !this.state.input.value.includes('?')) {
        this.setState({
            inputError: { 
                value: 'A full question, including a question mark, is required.', 
                status: true 
            }
        });
    }
    else {
        this.handleSubmit();
    }
  };

  // submit API query
  handleSubmit = () => {
    // start loading animation
    this.setState({
        loading: true
    });

    const query = encodeURIComponent(this.state.input.value);
    
    fetch(`${config.API_ENDPOINT}` + query, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
    .then(res => {
        if (!res.ok) {
            return res.json().then(error => {
                throw error
            })
        }

        return res.json();
    })
    .then(res => {
        this.handleAPIResponse(res);
    })
    .catch(error => {
        this.setState({ 
            apiError: { 
                value: 'Oops! The Great 8-Ball is not currently available.  Probably out questing.  Please try again later.', 
                status: true 
            },
            loading: false
        });
    })
  }

  // handle and package the response object from API call
  handleAPIResponse = res => {
    // add new response object to history array
    let updateHistory = this.state.history;
    if(updateHistory.length >= 10) {
        updateHistory.pop();
    }
    updateHistory.unshift(res.magic);

    this.setState({
        result: res.magic,
        history: updateHistory,
        loading: false
    });
  };

  toggleHistory = () => {
      this.setState({
          showHistory: this.state.showHistory === true ? false : true
      });
  };

  renderHistory = () => {
      const history = this.state.history.map(query => 
          <div className='queryHistory' key={this.state.history.indexOf(query)}>
              <p className='queryQuestion'>{query.question}</p>
              <p className='queryAnswer'>{query.answer}</p>
          </div>
      );

      if(this.state.history.length < 1) {
        return (
            <p className='errorText'>No history yet.  Submit a question to the Great 8-Ball above.</p>
        )
      }
      else {
          return history
      }
  };

  render() {
    return (
        <section className='InputForm'>
            {this.state.loading === true ? 
                <Loader
                    type="Puff"
                    color="#25b8f2"
                    height={100}
                    width={100}
                />
                : ''
            }
            <p className='queryResult'>{this.state.result.answer || ''}</p>
            {this.state.apiError.status === true 
                ? <p className='errorText'>{this.state.apiError.value}</p>
                : ''
            }
            <form 
                    id='InputForm_form'
                    onSubmit={this.validateInput}
                >
                    <section className='InputForm_formField'>
                        <label htmlFor='input'>
                            Ask the 8-Ball!
                        </label>
                        <input
                            type='text'
                            id='input'
                            onChange={e => this.updateInput(e.target.value)}
                            required
                        />
                        {this.state.inputError.status === true 
                            ? <p id='errorText'>{this.state.inputError.value}</p> 
                            : ''
                        }
                    </section>
                    <div id='InputForm_buttons'>
                        <button 
                            type='submit'
                        >
                            Submit
                        </button>
                        {' '}
                        <button type='button' onClick={() => this.toggleHistory()}>
                            Show History
                        </button>
                    </div>
                </form>
                <section id='InputForm_history'>
                    {this.state.showHistory === true 
                        ? this.renderHistory()
                        : ''
                    }
                </section>
        </section>
    );
  }
};

export default withRouter(InputForm);
