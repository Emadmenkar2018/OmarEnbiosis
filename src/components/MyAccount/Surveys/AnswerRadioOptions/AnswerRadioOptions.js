import React, { Component } from 'react'
import './AnswerRadioOptions.css'
import PropTypes from 'prop-types';
import OptionList from './OptionList/OptionList';
import QuestionsControlButtons from '../QuestionsControlButtons/QuestionsControlButtons'

export default class AnswerRadioOptions extends Component {
    state = {
        selectedOption: this.props.question.Answer === null ? {} : this.props.question.Answer[0],
        errMessage: '',
        isDisableNext: false
    };

    componentDidUpdate() {
        this.context.swipeableViews.slideUpdateHeight();
    }

    handleOptionChange = (optionValue) => {
        this.setState({
            selectedOption: optionValue,
            errMessage: ''
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {translate, sIndex, qIndex, question, currentSlide, questionsCount, next, setAnswer, kit_code, disableSection, lastQuestionInSection, lastQuestion, history} = this.props;
        const {selectedOption} = this.state;
        if(!disableSection){
            if(Object.keys(selectedOption).length === 0){
                return this.setState({
                    errMessage: translate('radio-err')
                });
            }
    
            const isEmpty = this.checkConditionalFieldsEmpty(question, selectedOption);
            if(isEmpty){
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
            const answer = {
                answers: {
                    [`${question.id}`]: [{...selectedOption}]
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
        return next();
    }

    checkConditionalFieldsEmpty(question, selectedOption) {
        const isConditional = question.option_name.some((option, index) => 
            Object.keys(selectedOption)[0] === `"${index}"` && option.is_if !== null
        );
        return isConditional && selectedOption[Object.keys(selectedOption)[0]] === null;
    }

    render() {
        const {selectedOption, errMessage, isDisableNext} = this.state;
        const {translate, question, currentSlide, prev, questionsCount, disableSection} = this.props;
        return (
            <div 
                className='answer'
            >
                <div className='answer-title'>
                    {question.title}
                </div>
                <form className='options-form' onSubmit={this.handleSubmit}>
                    <OptionList
                        translate={translate}
                        question={question}
                        selectedOption={selectedOption}
                        optionChange={this.handleOptionChange}
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

AnswerRadioOptions.contextTypes = {
    swipeableViews: PropTypes.object.isRequired
};