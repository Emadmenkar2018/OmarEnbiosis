import React, { Component } from 'react'
import './LoginForm.css'

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {login} = this.props;
        login(this.state);
    }

    render() {
        const {email, password} = this.state;
        const {translate, error} = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder={translate('email-input')}
                        name='email'
                        required
                        onChange={this.handleChange}
                        value={email}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder={translate('pass-input')}
                        name='password'
                        required
                        onChange={this.handleChange}
                        value={password}
                    />
                    {error.login && 
                        <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {error.login}
                        </small>
                    }
                </div>
                <div className='form-group'>
                    <button className='l-btn'>
                        {translate('login-button')}
                    </button>
                </div>
            </form>
        )
    }
}
