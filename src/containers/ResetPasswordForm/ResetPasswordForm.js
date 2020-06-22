import React, { Component, Fragment } from 'react'

class ResetPasswordForm extends Component {
    state = {
        loading: false,
        password: '',
        passwordRe: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handlePasswordReBlur = (e) => {
        const {password, passwordRe} = this.state;
        const {translate, setError, removeError} = this.props;
        password !== passwordRe ? 
            setError('passwordRe', translate('pass-err')) : 
            removeError('passwordRe');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {password, passwordRe} = this.state;
        const {token, handleReset, history} = this.props;
        this.setState({
            loading: true
        });
        handleReset(password, passwordRe, token)
            .then(() => {
                this.setState({
                    loading: false,
                    password: '',
                    passwordRe: ''
                });
                return history.push('/');
            })
            .catch(err => {
                return this.setState({
                    loading: false
                });
            })
    }

    render() {
        const {loading, password, passwordRe} = this.state;
        const {translate, error} = this.props;
        const checkError = error.passwordRe;
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
                            type='password'
                            name='password'
                            placeholder={translate('pass-input')}
                            required
                            minLength={6}
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            name='passwordRe'
                            placeholder={translate('pass-re-input')}
                            required
                            minLength={6}
                            value={passwordRe}
                            onChange={this.handleChange}
                            onBlur={this.handlePasswordReBlur}
                        />
                        {error.passwordRe &&
                            <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                                {error.passwordRe}
                            </small>
                        }
                        {error.token &&
                            <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                                {error.token}
                            </small>
                        }
                    </div>
                    <div className='form-group'>
                        <button disabled={checkError} className={`l-btn ${checkError ? 'n-disabled' : ''}`}>
                            {translate('reset-btn')}
                        </button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default ResetPasswordForm;