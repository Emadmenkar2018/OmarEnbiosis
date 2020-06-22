import React, { Component } from 'react'

class KitLoginForm extends Component {
    state = {
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {password} = this.state;
        const {translate, email, handleSubmit, messages} = this.props;
        return (
            <form className='user-form' onSubmit={handleSubmit.bind(this, password)}>
                <input
                    type='email'
                    placeholder={`Email Adres`}
                    name='email'
                    required
                    onChange={this.handleChange}
                    value={email}
                    disabled={true}
                />
                <input
                    type='password'
                    placeholder={translate('pass-input')}
                    name='password'
                    required
                    onChange={this.handleChange}
                    value={password}
                />
                {messages.error.error &&
                    <small className='err-msg' style={{color: '#d80f0f'}}>
                        {messages.error.error}
                    </small>
                }
                <button className='n-btn'>
                    {translate('reg-kit-btn')}
                </button>
            </form>
        )
    }
}

export default KitLoginForm;