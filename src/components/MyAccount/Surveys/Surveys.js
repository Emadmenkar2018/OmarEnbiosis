import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import AltHeader from '../../AltHeader/AltHeader'
import SectionCard from './SectionCard/SectionCard'
import {setActiveSideItem} from '../../../store/actions/general'
import {handleGetSurvey} from '../../../store/actions/survey'

class Surveys extends Component {
    state = {
        loading: Object.keys(this.props.survey).length === 0
    }

    componentDidMount(){
        const {survey, currentUser, setActiveSideItem, handleGetSurvey} = this.props;
        setActiveSideItem('account')
        if(Object.keys(survey).length === 0){
            const {kit_code} = currentUser.activeKit;
            handleGetSurvey(kit_code)
                .then(() => {
                    return this.setState({
                        loading: false
                    });
                })
                .catch(() => {
                    return this.setState({
                        loading: false
                    });
                });
        }
    }

    componentDidUpdate(prevProps){
        const {activeLanguage, currentUser, handleGetSurvey} = this.props;
        const {kit_code} = currentUser.activeKit;

        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            handleGetSurvey(kit_code)
                .then(() => {
                    return this.setState({
                        loading: false
                    });
                })
                .catch(err => {
                    return this.setState({
                        loading: false
                    });
                });
        }
    }

    render(){
        const {translate, survey, history} = this.props;
        const {loading} = this.state;
        let sectionList = [];
        if(Object.keys(survey).length !== 0){
            sectionList = survey.sections.map((section, index) => 
                <SectionCard
                    key={section.id}
                    history={history}
                    sIndex={index}
                    section={section}
                />
            );
        }
        return (
            loading ? 
                <div className='loading'>
                    <div className='loading-logo'></div>
                </div> : 
                <div className='main-card'>
                    <AltHeader
                        btnTitle={translate('mA-smallText')}
                        goTo='/account'
                    >
                        <div className='head-title'>
                            {translate('mA-survey')}
                        </div>
                        <hr/>
                        <div className='head-title'>
                            {survey.title}
                        </div>
                    </AltHeader>
                    {sectionList}
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

export default connect(mapStateToProps, {setActiveSideItem, handleGetSurvey})(Surveys);