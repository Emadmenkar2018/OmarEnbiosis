import React, { Component } from 'react'
import './SurveySection.css'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import AltHeader from '../../../AltHeader/AltHeader'
import QuestionList from '../QuestionList/QuestionList'
import DotPagination from '../../DotPagination/DotPagination'
import {handleGetSurvey} from '../../../../store/actions/survey'
import {setActiveSideItem} from '../../../../store/actions/general'
class SurveySection extends Component {
    state = {
        loading: Object.keys(this.props.survey).length === 0,
        currentSlide: 0
    };

    componentDidMount(){
        const {survey, currentUser, setActiveSideItem, handleGetSurvey, sIndex} = this.props;
        
        setActiveSideItem('account');
        
        if(Object.keys(survey).length === 0){
            const {kit_code} = currentUser.activeKit;
            handleGetSurvey(kit_code)
                .then(() => {
                    const {survey} = this.props;
                    const firstNullQuestion = survey.sections[sIndex].questions.findIndex(question => question.Answer === null);
                    return this.setState({
                        loading: false,
                        currentSlide: firstNullQuestion !== -1 ? firstNullQuestion : 0
                    });
                })
                .catch(() => {
                    return this.setState({
                        loading: false
                    });
                });
        }else {
            const firstNullQuestion = survey.sections[sIndex].questions.findIndex(question => question.Answer === null);
            return this.setState({
                currentSlide: firstNullQuestion !== -1 ? firstNullQuestion : 0
            });
        }
    }

    componentDidUpdate(prevProps){
        const {activeLanguage, currentUser, handleGetSurvey, sIndex} = this.props;
        const {kit_code} = currentUser.activeKit;

        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            handleGetSurvey(kit_code)
                .then(() => {
                    const {survey} = this.props;
                    const firstNullQuestion = survey.sections[sIndex].questions.findIndex(question => question.Answer === null);
                    return this.setState({
                        loading: false,
                        currentSlide: firstNullQuestion !== -1 ? firstNullQuestion : 0
                    });
                })
                .catch(() => {
                    return;
                });
        }
    }

    next = () => {
        this.setState((state) => ({
            currentSlide: state.currentSlide + 1
        }));
    };

    prev = () => {
        this.setState((state) => ({
            currentSlide: state.currentSlide - 1
        }));
    };

    updateCurrentSlide = (index) => {
        const { currentSlide } = this.state;

        if (currentSlide !== index) {
            this.setState({
                currentSlide: index
            });
        }
    };

    render(){
        const {translate, currentUser, survey, sIndex} = this.props;
        const {loading, currentSlide} = this.state;
        let output = null;
        let section = null;
        if(Object.keys(survey).length !== 0){
            section = survey.sections[sIndex];
            const questionsCount = section.questions.length;
            const foundSectionNullQuestions = section.questions.filter(question => question.Answer === null);
            let foundNullQuestions = [];
            survey.sections.forEach(section => {
                const nullQuestions = section.questions.filter(question => question.Answer === null);
                foundNullQuestions = [...foundNullQuestions, ...nullQuestions]
            })
            output = 
            <div className='question-card'>
                <div className='question-icon'></div>
                <QuestionList
                    translate={translate}
                    sIndex={sIndex}
                    section={section}
                    currentSlide={currentSlide}
                    updateCurrentSlide={this.updateCurrentSlide}
                    next={this.next}
                    prev={this.prev}
                    questionsCount={questionsCount}
                    disableSection={foundSectionNullQuestions.length === 0}
                    lastQuestionInSection={foundSectionNullQuestions.length === 1 ? foundSectionNullQuestions[0] : false}
                    foundNullQuestions={foundNullQuestions}
                    kit_code={currentUser.activeKit.kit_code}
                />
                <DotPagination 
                    dots={questionsCount}
                    currentSlide={currentSlide}
                    onChangeIndex={this.updateCurrentSlide}
                    disableSection={foundSectionNullQuestions.length === 0}
                />
            </div>
        }
        
        return (
            loading ? 
                <div className='loading'>
                    <div className='loading-logo'></div>
                </div> :
                <div className='main-card'>
                    <AltHeader
                        btnTitle={translate('mA-smallText')}
                        goTo='/account/survey'
                    >
                        <div className='head-title'>
                            {translate('mA-survey')}
                        </div>
                        <hr/>
                    </AltHeader>
                    <div>
                        <strong>{section !== null && section.title}</strong>
                    </div>
                    {output}
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        currentUser: state.currentUser,
        survey: state.survey
    }
}

export default connect(mapStateToProps, {setActiveSideItem, handleGetSurvey})(SurveySection);