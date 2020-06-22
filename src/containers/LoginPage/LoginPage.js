import React, {Fragment, Component} from 'react'
import './LoginPage.css'
import {Link, Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage, setActiveLanguage } from 'react-localize-redux';
import {authUser, handleSendVerificationCode, handleResetPasswordCheckEmail, handleResetPassword} from '../../store/actions/auth'
import LoginForm from '../../components/LoginForm/LoginForm'
import MembershipQuestion from '../../components/Membership/MembershipQuestion/MembershipQuestion'
import ResetPasswordEmailCheck from '../ResetPasswordEmailCheck/ResetPasswordEmailCheck'
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm'
import { setError, removeError, removeSuccess } from '../../store/actions/messages';
import { handleSetLanguage } from '../../store/actions/general';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isQuestion: false
        }
    }

    componentDidUpdate(){
        const {removeSuccess, messages} = this.props;
        if(messages.success !== ''){
            setTimeout(() => {
                removeSuccess();
            }, 3000)
        }
    }

    handleIsQuestion = (e) => {
        e.preventDefault();
        const {isQuestion} = this.state;
        this.setState({
            isQuestion: !isQuestion
        });
    }

    handleLogin = (userData) => {
        const {authUser, history} = this.props;
        authUser(userData)
            .then((user) => {
                if(user.email_verified_at === null){
                    handleSendVerificationCode();
                    return history.push('/verify-email');
                }
                return history.push('/');
            })
            .catch(() => {
                return;
            })
    }

    render(){
        const {translate, activeLanguage, handleSetLanguage, handleResetPasswordCheckEmail, handleResetPassword, messages, setError, removeError, history} = this.props
        const {isQuestion} = this.state;
        return (
            <Fragment>
                {!isQuestion ? 
                    <Fragment>
                        <div className='l-background-img'></div>
                        <div className='l-content'>
                            <div className='l-form'>
                                <div className='logo-container'>
                                    <div className='logo'></div>
                                </div>
                                {messages.success !== '' && 
                                    <div className='alert alert-success'>
                                        {messages.success}
                                    </div>
                                }
                                <Switch>
                                    <Route
                                        path='/login'
                                        render={() => (
                                            <Fragment>
                                                <LoginForm
                                                    translate={translate}
                                                    login={this.handleLogin}
                                                    error={messages.error}
                                                />
                                                <div className='l-footer'>
                                                    <Link  to='/password/reset'>{translate('forget-pass')}</Link>
                                                    <span>
                                                        {translate('kit-question')}&nbsp;
                                                        <button className='kit-register' onClick={this.handleIsQuestion}>
                                                            {translate('kit-register')}
                                                        </button>
                                                    </span>
                                                    <button className='change-lang-btn' onClick={() => handleSetLanguage(activeLanguage.code === 'en' ? 'tr' : 'en')}>
                                                        {translate('change-lang', {name: activeLanguage.name === 'English' ? 'Turkçe' : 'English'})}
                                                    </button>
                                                </div>
                                            </Fragment>
                                        )}
                                    />

                                    <Route
                                        path='/password/reset/:token'
                                        render={props => (
                                            <ResetPasswordForm
                                                translate={translate}
                                                token={props.match.params.token}
                                                error={messages.error}
                                                setError={setError}
                                                removeError={removeError}
                                                handleReset={handleResetPassword}
                                                history={history}
                                            />
                                        )}
                                    />
                                    <Route
                                        exact path='/password/reset'
                                        render={() => (
                                            <ResetPasswordEmailCheck
                                                translate={translate}
                                                error={messages.error}
                                                handleCheckEmail={handleResetPasswordCheckEmail}
                                            />
                                        )}
                                    />

                                    <Route
                                        path='/'
                                        render={() => (
                                            <Redirect to='/login'/>
                                        )}
                                    />
                                </Switch>
                            </div>
                        </div> 
                    </Fragment> : 
                    <MembershipQuestion
                        translate={translate}
                        goLogin={this.handleIsQuestion}
                    />
                }
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    return {
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        currentUser: state.currentUser,
        messages: state.messages
    }
}

export default withRouter(connect(mapStateToProps, {handleSetLanguage, setActiveLanguage, authUser, handleResetPasswordCheckEmail, handleResetPassword, setError, removeError, removeSuccess})(LoginPage));