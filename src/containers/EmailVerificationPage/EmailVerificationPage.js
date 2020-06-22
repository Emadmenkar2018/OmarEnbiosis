import React, { Component, Fragment } from 'react'
import './EmailVerificationPage.css'
import {connect} from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import {setSuccess, removeSuccess, setError, removeError} from '../../store/actions/messages'
import {handleSendVerificationCode, handleCheckVerificationCode} from '../../store/actions/auth'

class EmailVerificationPage extends Component {
    state = {
        loading: false,
        verifyCode: ''
    }

    componentDidUpdate(){
        const {removeSuccess} = this.props;
        const {success} = this.props.messages;
        if(success !== ''){
            setTimeout(() => {
                removeSuccess();
            }, 3000);
        }
    }

    handleChange = (e) => {
        const {removeError} = this.props;
        const {error} = this.props.messages;
        if(error.verifyCode !== ''){
            removeError('verifyCode');
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleVerifyEmail = (e) => {
        e.preventDefault();
        const {verifyCode} = this.state;
        const {setError, handleCheckVerificationCode, history} = this.props;
        if(verifyCode === ''){
            return setError('verifyCode', 'Lütfen alanı doldurun.');
        }
        this.setState({
            loading: true
        });
        handleCheckVerificationCode(verifyCode)
            .then(() => {
                this.setState({
                    loading: false
                })
                return history.push('/');
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    handleResendEmail = (e) => {
        e.preventDefault();
        const {setSuccess} = this.props;
        this.setState({
            loading: true
        });
        handleSendVerificationCode()
            .then(() => {
                setSuccess('Doğrulama Kodu Başarıyla Gönderildi.');
                return this.setState({
                    loading: false
                })
            })
            .catch(err => {
                return this.setState({
                    loading: false
                })
            });
    }

    render() {
        const {loading, verifyCode} = this.state;
        const {translate} = this.props;
        const {success, error} = this.props.messages;
        return (
            <Fragment>
                {loading &&
                    <div className='loading'>
                        <div className='loading-logo'></div>
                    </div>
                }
                <div className='m-background-img'></div>
                <div className='m-content'>
                    <div className='m-logo'></div>
                    {success !== '' && 
                        <div className='alert alert-success'>
                            {success}
                        </div>
                    }
                    <div className='v-card'>
                        <div className='v-title'>
                            {translate('ver-title')}
                        </div>
                        <div className='v-wrapper'>
                            <div className='v-input-wrapper'>
                                <input
                                    className='v-input'
                                    name='verifyCode'
                                    placeholder={translate('ver-input')}
                                    value={verifyCode}
                                    onChange={this.handleChange}
                                />
                                {error.verifyCode && 
                                    <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                                        {error.verifyCode}
                                    </small>
                                }
                            </div>
                            <div className='btns-group'>
                                <button className='n-btn' onClick={this.handleVerifyEmail}>
                                    {translate('ver-btn')}
                                </button>
                                <button className='r-btn' onClick={this.handleResendEmail}>
                                    {translate('resent-btn')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        translate: getTranslate(state.localize),
        messages: state.messages
    }
}

export default connect(mapStateToProps, {setSuccess, removeSuccess, setError, removeError, handleCheckVerificationCode})(EmailVerificationPage);