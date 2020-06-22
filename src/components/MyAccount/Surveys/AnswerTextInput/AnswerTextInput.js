import React, { Component } from 'react'
import PropTypes from 'prop-types';
import QuestionsControlButtons from '../QuestionsControlButtons/QuestionsControlButtons'

class AnswerTextInput extends Component {
    state = {
        answer: this.props.question.Answer === null ? '' : this.props.question.Answer,
        errMessage: '',
        isDisableNext: false
    }

    componentDidUpdate() {
        this.context.swipeableViews.slideUpdateHeight();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errMessage: ''
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {translate, sIndex, qIndex, question, currentSlide, questionsCount, next, setAnswer, kit_code, disableSection, lastQuestionInSection, lastQuestion, history} = this.props;
        const {answer} = this.state;
        if(!disableSection){
            if(answer === ''){
                return this.setState({
                    errMessage: translate('mA-empty-err')
                });
            }
            this.setState({
                isDisableNext: true
            });
            const isNext = currentSlide !== questionsCount - 1;
            const isLast = !lastQuestion ? lastQuestion : question.id === lastQuestion.id;
            const isLastInSection = !lastQuestionInSection ? lastQuestionInSection : question.id === lastQuestionInSection.id;
            const answerObj = {
                answers: {
                    [`${question.id}`]: answer
                },
                kit_code,
                end: isLast
            }
            return setAnswer(sIndex, qIndex, answerObj)
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
        return next();
    }

    render(){
        const {errMessage, answer, isDisableNext} = this.state;
        const {translate, question, currentSlide, prev, questionsCount, disableSection} = this.props;
        return (
            <div 
                className='answer'
            >
                <div className='answer-title'>
                    {question ? 
                        question.title : 
                        'Name'
                    }
                </div>
                <form className='options-form' onSubmit={this.handleSubmit}>
                    <input
                        className='answer-input'
                        type='text'
                        name='answer'
                        placeholder={translate('mA-text-input')}
                        value={answer}
                        onChange={this.handleChange}
                        disabled={disableSection}
                    />
                    {errMessage !== '' &&
                        <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {errMessage}
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

AnswerTextInput.contextTypes = {
    swipeableViews: PropTypes.object.isRequired
};

export default AnswerTextInput;