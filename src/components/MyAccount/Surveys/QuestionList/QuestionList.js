import React, {Fragment} from 'react'
import './QuestionList.css'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views';
import AnswerDateInput from '../AnswerDateInput/AnswerDateInput'
import AnswerTextInput from '../AnswerTextInput/AnswerTextInput';
import AnswerRadioOptions from '../AnswerRadioOptions/AnswerRadioOptions'
import AnswerCheckboxOptions from '../AnswerCheckboxOptions/AnswerCheckboxOptions'
import AnswerNumberInput from '../AnswerNumberInput/AnswerNumberInput'
import {handleSetQuestionAnswer} from '../../../../store/actions/survey'

const QuestionList = (
    {
        translate, 
        sIndex, 
        section, 
        currentSlide, 
        updateCurrentSlide, 
        next, 
        prev, 
        questionsCount, 
        disableSection, 
        lastQuestionInSection, 
        foundNullQuestions, 
        kit_code, 
        handleSetQuestionAnswer
    }
) => {
    let history = useHistory();
    const lastQuestionInSurvey = foundNullQuestions.length === 1 ? foundNullQuestions[0] : false;
    let questionList = section.questions.map((question, index) => {
        switch(question.question_type){
            case 'text':
                return (
                    <AnswerTextInput
                        translate={translate}
                        key={question.id}
                        sIndex={sIndex}
                        qIndex={index}
                        question={question}
                        currentSlide={currentSlide}
                        next={next}
                        prev={prev}
                        questionsCount={questionsCount}
                        disableSection={disableSection}
                        lastQuestionInSection={lastQuestionInSection}
                        lastQuestion={lastQuestionInSurvey}
                        setAnswer={handleSetQuestionAnswer}
                        history={history}
                        kit_code={kit_code}
                    />
                )
            case 'textarea':
                return (
                    <AnswerTextInput
                        translate={translate}
                        key={question.id}
                        sIndex={sIndex}
                        qIndex={index}
                        question={question}
                        currentSlide={currentSlide}
                        next={next}
                        prev={prev}
                        questionsCount={questionsCount}
                        disableSection={disableSection}
                        lastQuestionInSection={lastQuestionInSection}
                        lastQuestion={lastQuestionInSurvey}
                        setAnswer={handleSetQuestionAnswer}
                        history={history}
                        kit_code={kit_code}
                    />
                )
            case 'number':
                return (
                    <AnswerNumberInput
                        translate={translate}
                        key={question.id}
                        sIndex={sIndex}
                        qIndex={index}
                        question={question}
                        currentSlide={currentSlide}
                        next={next}
                        prev={prev}
                        questionsCount={questionsCount}
                        disableSection={disableSection}
                        lastQuestionInSection={lastQuestionInSection}
                        lastQuestion={lastQuestionInSurvey}
                        setAnswer={handleSetQuestionAnswer}
                        history={history}
                        kit_code={kit_code}
                    />
                )
            case 'date':
                return (
                    <AnswerDateInput
                        translate={translate}
                        key={question.id}
                        sIndex={sIndex}
                        qIndex={index}
                        question={question}
                        currentSlide={currentSlide}
                        next={next}
                        prev={prev}
                        questionsCount={questionsCount}
                        disableSection={disableSection}
                        lastQuestionInSection={lastQuestionInSection}
                        lastQuestion={lastQuestionInSurvey}
                        setAnswer={handleSetQuestionAnswer}
                        history={history}
                        kit_code={kit_code}
                    />
                )
            case 'radio':
                return (
                    <AnswerRadioOptions
                        translate={translate}
                        key={question.id}
                        sIndex={sIndex}
                        qIndex={index}
                        question={question}
                        currentSlide={currentSlide}
                        next={next}
                        prev={prev}
                        questionsCount={questionsCount}
                        disableSection={disableSection}
                        lastQuestionInSection={lastQuestionInSection}
                        lastQuestion={lastQuestionInSurvey}
                        setAnswer={handleSetQuestionAnswer}
                        history={history}
                        kit_code={kit_code}
                    />
                )
            case 'checkbox':
                return (
                    <AnswerCheckboxOptions
                        translate={translate}
                        key={question.id}
                        sIndex={sIndex}
                        qIndex={index}
                        question={question}
                        currentSlide={currentSlide}
                        next={next}
                        prev={prev}
                        questionsCount={questionsCount}
                        disableSection={disableSection}
                        lastQuestionInSection={lastQuestionInSection}
                        lastQuestion={lastQuestionInSurvey}
                        setAnswer={handleSetQuestionAnswer}
                        history={history}
                        kit_code={kit_code}
                    />
                )
            default:
                return <Fragment></Fragment>;
        }
    });
    return (
        <SwipeableViews 
            index={currentSlide}
            onChangeIndex={updateCurrentSlide}
            animateHeight
            enableMouseEvents={disableSection}
            disabled={!disableSection}
            className='swipe-view'
        >
            {questionList}
        </SwipeableViews>
    )
}

export default connect(null, {handleSetQuestionAnswer})(QuestionList);