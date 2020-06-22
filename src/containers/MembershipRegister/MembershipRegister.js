import React, { Component, Fragment } from 'react'
import './MembershipRegister.css'
import {connect} from 'react-redux'
import { getTranslate } from 'react-localize-redux';
// import {Link} from 'react-router-dom'
import KitForm from '../../components/Membership/KitForm/KitForm'
import UserForm from '../../components/Membership/UserForm/UserForm'
import KitLoginForm from '../../components/Membership/KitLoginForm/KitLoginForm'
import TermsOfService from '../../components/Membership/TermsOfService/TermsOfService'
import {setKitId, handleCheckKitId, handleValidateUser, handleCreateUser, handleKitLogin} from '../../store/actions/register'
import {handleSendVerificationCode} from '../../store/actions/auth'
import {setError, removeError} from '../../store/actions/messages'
class MembershipRegister extends Component {
    handleKitFormSubmit = (e) => {
        e.preventDefault();
        const {kitId} = this.props.register;
        const {handleCheckKitId} = this.props;
        handleCheckKitId(kitId);
    }

    handleUserForm = (userData) => {
        const {handleValidateUser} = this.props;
        handleValidateUser(userData);
    }

    handleTermsOfService = (e) => {
        e.preventDefault();
        const {handleCreateUser, history} = this.props;
        const {userData} = this.props.register;
        handleCreateUser(userData)
            .then((user) => {
                if(user.email_verified_at === null){
                    handleSendVerificationCode();
                    return history.push('/verify-email');
                }
                return history.push('/');
            })
            .catch(err => {
                // return console.log(err);
                return;
            })
    }

    handleKitLoginForm = (password, e) => {
        e.preventDefault();
        const {kitId} = this.props.register;
        const {currentUser, handleKitLogin, history} = this.props;
        handleKitLogin(currentUser.user.email, password, kitId)
            .then(() => {
                history.push('/');
            })
            .catch(err => {
                // return console.log(err);
                return;
            })
    }

    render() {
        const {currentStage, kitId} = this.props.register;
        const {translate, setKitId, messages, setError, removeError, currentUser} = this.props;
        let output = '';
        switch(currentStage){
            case 1:
                output = 
                    <Fragment>
                        <p className='r-head'>{translate('reg-kit-title')}</p>
                        <p className='r-info-title'>{translate('reg-kit-desc')}</p>
                        {/* <p className='r-info'>
                            There are ID numbers on the inside box, as well as the sample tube that can also be used.
                            &nbsp;<Link to='/register'>Learn more.</Link>
                        </p> */}
                        <KitForm
                            translate={translate}
                            kitId={kitId}
                            setKitId={setKitId}
                            handleSubmit={this.handleKitFormSubmit}
                            messages={messages}
                        />
                    </Fragment>
                break;
            case 2:
                output = currentUser.isAuthenticated ? 
                    <KitLoginForm
                        translate={translate}
                        kitId={kitId}
                        email={currentUser.user.email}
                        handleSubmit={this.handleKitLoginForm}
                        messages={messages}
                    /> : 
                    <UserForm
                        translate={translate}
                        kitId={kitId}
                        handleSubmit={this.handleUserForm}
                        messages={messages}
                        setError={setError}
                        removeError={removeError}
                    />
                break;
            case 3:
                output = 
                    <TermsOfService
                        translate={translate}
                        handleSubmit={this.handleTermsOfService}
                    />
                break;
            default:
                break;
        }
        return (
            <Fragment>
                <div className='m-background-img'></div>
                <div className={currentStage !== 2 || currentUser.isAuthenticated ? 'r-content': 'r-uf-content'}>
                    <div className='m-logo'></div>
                    <div className='r-card'>
                        <div className='r-card-img'></div>
                        <div className='r-text'>
                            <div className='r-steps'>
                                <div className={`step ${currentStage === 1 ? 'current-step' : ''}`}>
                                    01
                                </div>
                                <div className='r-line'>
                                    <div className='line'></div>
                                </div>
                                <div className={`step ${currentStage === 2 ? 'current-step' : ''}`}>
                                    02
                                </div>
                                {!currentUser.isAuthenticated && 
                                    <Fragment>
                                        <div className='r-line'>
                                            <div className='line'></div>
                                        </div>
                                        <div className={`step ${currentStage === 3 ? 'current-step' : ''}`}>
                                            03
                                        </div>
                                    </Fragment>
                                }
                            </div>
                            {output}
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
        register: state.register,
        messages: state.messages,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {
    setKitId, 
    handleCheckKitId, 
    handleValidateUser, 
    handleCreateUser, 
    handleKitLogin, 
    setError, 
    removeError
})(MembershipRegister);