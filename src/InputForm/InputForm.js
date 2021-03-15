import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIContext from '../APIContext';
import './InputForm.css';

class InputForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props)
    this.state = {
        input: { value: '', touched: false },
        result: '',
        history: [],
        loading: false,
        inputError: { value: '', status: false }
    };
  };

  // update state with query input value
  updateInput = val => {
    this.setState({input: { value: val, touched: true }});
  };
  
  // validate input before calling API
  validateInput = e => {
    e.preventDefault();
    console.log('called 1')
    // clear any previous errors
    if(this.state.inputError.status === true) {
        this.setState({
            inputError: { 
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
      console.log('called')
  }

  render() {
    return (
        <section className='InputForm'>
            <p className='queryResult'>{this.state.result}</p>
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
                            ? <p id='formErrorText'>{this.state.inputError.value}</p> 
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
                        <button type='button'>
                            Show History
                        </button>
                    </div>
                </form>
        </section>
    );
  }
};

export default withRouter(InputForm);
