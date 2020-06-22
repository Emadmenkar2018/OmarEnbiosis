import React, { Component } from 'react'
import './UserForm.css'
import moment from 'moment'

class UserForm extends Component {
    state = {
        name: '',
        surname: '',
        email: '',
        emailRe: '',
        tel: '',
        birthdate: '',
        gender: null,
        password: '',
        passwordRe: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDateChange = (e) => {
        const {translate, messages, setError, removeError} = this.props;
        let birthdate = e.target.value;
        const validDate = moment(birthdate, 'DD-MM-YYYY', true).isValid();
        if(birthdate.length === 10){
            const nowYear = new Date().getFullYear()
            const year = birthdate.slice(6);
            if(year < '1900' || year > nowYear){
                setError('birthdate', translate('date-year-err'))
                return this.setState({
                    birthdate,
                });
            }
            if(!validDate){
                setError('birthdate', translate('date-err'))
                return this.setState({
                    birthdate,
                });
            }
            if(messages.error.birthdate){
                removeError('birthdate');
            }
        }
        this.setState({
            birthdate,
        });
    }

    handleDateKeyPress = (e) => {
        const charCode = (e.which) ? e.which : e.keyCode;
        let birthdate = e.target.value;
        if(charCode !== 8 && (charCode < 48 || charCode > 57)){
            return e.preventDefault();
        }
        
        if(charCode !== 8){
            if(birthdate.length === 2 || birthdate.length === 5){
                birthdate += '-'
                this.setState({
                    birthdate
                });
            }
        }
    }

    handleRadioChange = (e) => {
        const {removeError, messages} = this.props;
        messages.error.gender && removeError('gender');
        this.setState({
            gender: e.target.value
        })
    }

    handleEmailReBlur = (e) => {
        const {email, emailRe} = this.state;
        const {translate, setError, removeError} = this.props;
        email !== emailRe ? 
            setError('emailRe', translate('email-err')) : 
            removeError('emailRe');
    }

    handlePasswordReBlur = (e) => {
        const {password, passwordRe} = this.state;
        const {translate, setError, removeError} = this.props;
        password !== passwordRe ? 
            setError('passwordRe', translate('pass-err')) : 
            removeError('passwordRe');
    }

    handleUserData = (e) => {
        e.preventDefault();
        const {translate, kitId, handleSubmit, setError} = this.props;
        const {name, surname, tel, gender, birthdate, email, password, passwordRe} = this.state;
        if(gender === null){
            return setError('gender', translate('radio-err'));
        }
        const date_of_birth = `${birthdate.slice(6)}-${birthdate.slice(3, 5)}-${birthdate.slice(0, 2)}`;
        const userData = {
            name: `${name} ${surname}`,
            email,
            phone: tel,
            gender,
            date_of_birth,
            kit_code: kitId,
            password,
            password_confirmation: passwordRe
        }
        handleSubmit(userData);
    }

    render(){
        const {translate, messages} = this.props;
        const {name, surname, tel, gender, birthdate, email, emailRe, password, passwordRe} = this.state;
        const checkError = messages.error.emailRe || messages.error.passwordRe || messages.error.birthdate || messages.error.gender;
        return (
            <form className='user-form' onSubmit={this.handleUserData}>
                <input
                    type='text'
                    name='name'
                    placeholder={translate('name-input')}
                    required
                    value={name}
                    onChange={this.handleChange}
                />
                <input
                    type='text'
                    name='surname'
                    placeholder={translate('surname-input')}
                    required
                    value={surname}
                    onChange={this.handleChange}
                />
                <div className='user-input-wrapper'>
                    <input
                        type='email'
                        name='email'
                        placeholder={translate('email-input')}
                        required
                        value={email}
                        onChange={this.handleChange}
                    />
                    {messages.error.email &&
                        <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {messages.error.email}
                        </small>
                    }
                </div>
                <div className='user-input-wrapper'>
                    <input
                        type='email'
                        name='emailRe'
                        placeholder={translate('email-re-input')}
                        required
                        value={emailRe}
                        onBlur={this.handleEmailReBlur}
                        onChange={this.handleChange}
                    />
                    {messages.error.emailRe &&
                        <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {messages.error.emailRe}
                        </small>
                    }
                </div>
                <input
                    type='text'
                    name='tel'
                    placeholder={translate('tel-input')}
                    required
                    minLength={11}
                    maxLength={15}
                    value={tel}
                    onChange={this.handleChange}
                />
                <div className='user-input-wrapper'>
                    <input
                        type='text'
                        name='birthdate'
                        placeholder={translate('mA-date-input')}
                        minLength='10'
                        maxLength='10'
                        required
                        value={birthdate}
                        onKeyDown={this.handleDateKeyPress}
                        onChange={this.handleDateChange}
                    />
                    {messages.error.birthdate &&
                        <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {messages.error.birthdate}
                        </small>
                    }
                </div>
                <div className='gender-list-wrapper'>
                    <ul className='gender-list'>
                        <li>
                        <label className='label-container' style={{
                            marginRight: 40
                        }}>
                            <input
                                type="radio"
                                name={`gender-group`}
                                value={1}
                                onChange={this.handleRadioChange}
                                checked={gender === '1'}
                            />
                            <span className="checkmark"></span>
                            {translate('gender-male')}
                        </label>
                        </li>
                        <li>
                        <label className='label-container'>
                            <input
                                type="radio"
                                name={`gender-group`}
                                value={2}
                                onChange={this.handleRadioChange}
                                checked={gender === '2'}
                            />
                            <span className="checkmark"></span>
                            {translate('gender-female')}
                        </label>
                        </li>
                    </ul>
                    {messages.error.gender &&
                        <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {messages.error.gender}
                        </small>
                    }
                </div>
                <input
                    type='password'
                    name='password'
                    placeholder={translate('pass-input')}
                    required
                    minLength={6}
                    value={password}
                    onChange={this.handleChange}
                />
                <div className='user-input-wrapper'>
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
                    {messages.error.passwordRe &&
                        <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {messages.error.passwordRe}
                        </small>
                    }
                </div>
                <button disabled={checkError} className={`n-btn ${checkError ? 'n-disabled' : ''}`}>
                    {translate('next-btn')}
                </button>
            </form>
        )  
    }
}

export default UserForm;