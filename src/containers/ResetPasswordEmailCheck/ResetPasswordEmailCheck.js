import React, { Component, Fragment } from 'react'

class ResetPasswordEmailCheck extends Component {
    state = {
        loading: false,
        email: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {email} = this.state;
        const {handleCheckEmail} = this.props;
        this.setState({
            loading: true
        });
        handleCheckEmail(email)
            .then(() => {
                return this.setState({
                    loading: false,
                    email: ''
                });
            })
            .catch(err => {
                return this.setState({
                    loading: false
                });
            })
    }

    render() {
        const {loading, email} = this.state;
        const {translate, error} = this.props;
        return (
            <Fragment>
                {loading &&
                    <div className='loading'>
                        <div className='loading-logo'></div>
                    </div>
                }
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
                        {error.email && 
                            <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                                {error.email}
                            </small>
                        }
                    </div>
                    <div className='form-group'>
                        <button className='l-btn'>
                            {translate('reset-btn')}
                        </button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default ResetPasswordEmailCheck;