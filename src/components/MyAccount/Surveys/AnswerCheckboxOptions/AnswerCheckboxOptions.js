import React, { Component } from 'react'
import './AnswerCheckboxOptions.css'
import PropTypes from 'prop-types';
import OptionList from './OptionList/OptionList'
import QuestionsControlButtons from '../QuestionsControlButtons/QuestionsControlButtons'

export default class AnswerCheckboxOptions extends Component {
    state = {
        selectedOptions: this.props.question.Answer === null ? [] : this.props.question.Answer,
        errMessage: '',
        isDisableNext: false
    }

    componentDidUpdate() {
        this.context.swipeableViews.slideUpdateHeight();
    }

    handleAddOption = (optionValue) => {
        const {selectedOptions} = this.state;
        let options = [...selectedOptions];
        options.push(optionValue);
        this.setState({
            selectedOptions: [...options],
            errMessage: ''
        });
    }

    handleUpdateOption = (index, conditionalAnswer) => {
        const {selectedOptions} = this.state;
        let options = [...selectedOptions];
        let optionIndex = options.findIndex(option => Object.keys(option)[0] === `"${index}"`);
        options[optionIndex][`"${index}"`] = conditionalAnswer === '' ? null : conditionalAnswer;
        this.setState({
            selectedOptions: [...options]
        });
    }

    handleRemoveOption = (index) => {
        const {selectedOptions} = this.state;
        let options = selectedOptions.filter(option => Object.keys(option)[0] !== `"${index}"`);
        this.setState({
            selectedOptions: [...options],
            errMessage: ''
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {translate, sIndex, qIndex, question, currentSlide, questionsCount, next, setAnswer, kit_code, disableSection, lastQuestionInSection, lastQuestion, history} = this.props;
        const {selectedOptions} = this.state;
        if(!disableSection){
            if(selectedOptions.length === 0){
                return this.setState({
                    errMessage: translate('mA-checkbox-err')
                });
            }
    
            const isEmpty = this.checkConditionalFieldsEmpty(question, selectedOptions);
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
                    [`${question.id}`]: [...selectedOptions]
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

    checkConditionalFieldsEmpty(question, selectedOptions) {
        let selectedConditinalOptions = selectedOptions.filter(selecOption => {
            const isConditional = question.option_name.some((option, index) => 
                `"${index}"` === Object.keys(selecOption)[0] && option.is_if !== null 
            );
            return isConditional && selecOption[Object.keys(selecOption)[0]] === null
        });
        return selectedConditinalOptions.length !== 0;
    }

    render() {
        const {selectedOptions, errMessage, isDisableNext} = this.state;
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
                        selectedOptions={selectedOptions}
                        addOption={this.handleAddOption}
                        removeOption={this.handleRemoveOption}
                        updateOption={this.handleUpdateOption}
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

AnswerCheckboxOptions.contextTypes = {
    swipeableViews: PropTypes.object.isRequired
};