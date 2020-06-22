import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import QuestionsControlButtons from '../QuestionsControlButtons/QuestionsControlButtons'
import moment from 'moment'
class AnswerDateInput extends PureComponent {
    state = {
        birthDate: this.props.question.Answer === null ? '' : this.props.question.Answer,
        errMessage: '',
        emptyErrMessage: '',
        isDisableNext: false
    };

    componentDidUpdate() {
        this.context.swipeableViews.slideUpdateHeight();
    }

    handleDateChange = (e) => {
        const {translate} = this.props;
        let birthDate = e.target.value;
        // if(birthDate.length === 4){
        //     const year = new Date().getFullYear()
        //     if(birthDate < '1900' || birthDate > year){
        //         return this.setState({
        //             errMessage: 'GG - AA - YYYY şeklinde giriş yapınız.',
        //             emptyErrMessage: ''
        //         });
        //     }
        // }
        // if(birthDate.length === 7){
        //     let month = birthDate.slice(5, 7);
        //     if(month < '01' || month > '12'){
        //         return this.setState({
        //             errMessage: 'GG - AA - YYYY şeklinde giriş yapınız.',
        //             emptyErrMessage: ''
        //         });
        //     }
        // }
        const validDate = moment(birthDate, 'DD-MM-YYYY', true).isValid();
        if(birthDate.length === 10){
            const nowYear = new Date().getFullYear()
            const year = birthDate.slice(6);
            if(year < '1900' || year > nowYear){
                return this.setState({
                    errMessage: translate('date-year-err'), 
                    emptyErrMessage: '',
                    birthDate
                });
            }
            if(!validDate){
                return this.setState({
                    errMessage: translate('date-err'),
                    emptyErrMessage: '',
                    birthDate
                });
            }
        }
        this.setState({
            birthDate,
            errMessage: '',
            emptyErrMessage: ''
        });
    }

    handleDateKeyPress = (e) => {
        const charCode = (e.which) ? e.which : e.keyCode;
        let birthDate = e.target.value;
        if(charCode !== 8 && (charCode < 48 || charCode > 57)){
            return e.preventDefault();
        }
        
        if(charCode !== 8){
            if(birthDate.length === 2 || birthDate.length === 5){
                birthDate += '-'
                this.setState({
                    birthDate
                });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {translate, sIndex, qIndex, question, currentSlide, questionsCount, next, setAnswer, kit_code, disableSection, lastQuestionInSection, lastQuestion, history} = this.props;
        const {birthDate, errMessage} = this.state;
        if(!disableSection){
            if(errMessage === ''){
                if(birthDate === '' || birthDate.length < 10){
                    return this.setState({
                        emptyErrMessage: translate('mA-empty-err')
                    });
                }
                this.setState({
                    isDisableNext: true
                });
                const isNext = currentSlide !== questionsCount - 1;
                const isLast = !lastQuestion ? lastQuestion : question.id === lastQuestion.id;
                const isLastInSection = !lastQuestionInSection ? lastQuestionInSection : question.id === lastQuestionInSection.id;
                const answer = {
                    answers: {
                        [`${question.id}`]: birthDate
                    },
                    kit_code,
                    end: isLast
                }
                return setAnswer(sIndex, qIndex, answer)
                    .then(() => {
                        if(isNext && !isLastInSection){
                            this.setState({
                                isDisableNext: false
                            });
                            return next();
                        }
                        this.setState({
                            isDisableNext: false
                        });
                        return history.push('/account/survey');
                    })
                    .catch(() => {
                        return;
                    })
            }
        }
        return next();
    }

    render() {
        const {birthDate, errMessage, emptyErrMessage, isDisableNext} = this.state;
        const {translate, question, currentSlide, prev, questionsCount, disableSection} = this.props;
        return (
            <div 
                className='answer'
            >
                <div className='answer-title'>
                    {question ? 
                        question.title : 
                        'What is your date of birth?'
                    }
                </div>
                <form className='options-form' onSubmit={this.handleSubmit}>
                    <input
                        className='answer-input'
                        type='text'
                        name='birthDate'
                        placeholder={translate('mA-date-input')}
                        maxLength='10'
                        minLength='10'
                        value={birthDate}
                        onKeyDown={this.handleDateKeyPress}
                        onChange={this.handleDateChange}
                        disabled={disableSection}
                    />
                    {errMessage !== '' && 
                        <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {errMessage}
                        </small>
                    }
                    {emptyErrMessage !== '' && 
                        <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {emptyErrMessage}
                        </small>
                    }
                    {!disableSection && 
                        <QuestionsControlButtons
                            prevTitle={translate('mA-prev-title')}
                            nextTitle={translate('mA-next-title')}
                            finishTitle={translate('mA-finish-title')}
                            currentSlide={currentSlide}
                            prev={prev}
                            questionsCount={questionsCount}
                            isDisableNext={isDisableNext}
                        />
                    }
                </form>
            </div>
        )
    }
}

AnswerDateInput.contextTypes = {
    swipeableViews: PropTypes.object.isRequired
};

export default AnswerDateInput;