import React, { Component } from 'react'
import './IntroToRecommendations.css'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import {setActiveSideItem} from '../../../store/actions/general'
import CardHead from '../../../components/CardHead/CardHead'
import IntroCard from '../../../components/MyFoods/IntroCard/IntroCard'
import {handleGetSuggestions} from '../../../store/actions/myFoods'

class IntroToRecommendations extends Component {
    state = {
        loading: this.props.suggestions.length === 0,
        errMessage: ''
    }

    componentDidMount(){
        const {setActiveSideItem, activeKit, suggestions, handleGetSuggestions} = this.props;
        setActiveSideItem('food');

        if(suggestions.length === 0){
            const kitCode = activeKit.kit_code;
            handleGetSuggestions(kitCode)
                .then(() => {
                    return this.setState({
                        loading: false,
                        errMessage: ''
                    });
                })
                .catch(err => {
                    return this.setState({
                        loading: false,
                        errMessage: err.kit_code
                    });
                })
        }
    }

    componentDidUpdate(prevProps){
        const {activeLanguage, activeKit, handleGetSuggestions} = this.props;
        const kitCode = activeKit.kit_code;

        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            handleGetSuggestions(kitCode)
                .then(() => {
                    return this.setState({
                        loading: false,
                        errMessage: ''
                    });
                })
                .catch(err => {
                    return this.setState({
                        loading: false,
                        errMessage: err.kit_code
                    });
                });
        }
    }

    render() {
        const {loading, errMessage} = this.state;
        const {translate, suggestions} = this.props;
        let suggestionList = [];
        if(suggestions.length !== 0){
            suggestionList = suggestions.map((sugg, index) => 
                <IntroCard 
                    key={index}
                    id={index}
                    title={sugg.title}
                    content={sugg.desc}
                />
            )
        }
        return (
            loading ? 
                <div className='loading'>
                    <div className='loading-logo'></div>
                </div> : 
                <div className='main-card'>
                    <CardHead
                        headIcon='besin-skorlari-icon.png'
                        smallText={translate('intro-smallText')}
                        pText={translate('intro-pText')}
                    />
                    
                    <p className='intro-title'>
                        <strong>{translate('intro-desc')}</strong>
                    </p>
                    {errMessage !== '' ? 
                        <div
                            style={{fontSize: '1.2rem', textAlign: 'center', textTransform: 'capitalize'}}
                        >
                            <strong>{errMessage}</strong>
                        </div> : 
                        suggestionList
                    }
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        activeKit: state.currentUser.activeKit,
        suggestions: state.myFoods.suggestions
    }
}

export default connect(mapStateToProps, {setActiveSideItem, handleGetSuggestions})(IntroToRecommendations);