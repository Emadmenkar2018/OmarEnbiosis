import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { getTranslate, setActiveLanguage } from 'react-localize-redux';
import {setActiveSideItem} from '../../../store/actions/general'
import {handleGetTestData} from '../../../services/api'
import MicroTestResultCard from '../../../components/HomePage/MicroTestResultCard/MicroTestResultCard'
import CloseProfileCard from '../../../components/HomePage/CloseProfileCard/CloseProfileCard'
import AllMyScoresCard from '../../../components/HomePage/AllMyScoresCard/AllMyScoresCard'
import AllMyFoodsCard from '../../../components/HomePage/AllMyFoodsCard/AllMyFoodsCard'

class HomeDemo extends Component {
    state = {
        loading: Object.keys(this.props.myResults.microTestResult).length === 0 || this.props.myResults.allScores.length === 0 || this.props.myResults.closeProfiles.length === 0,
        foodError: '',
        analizError: ''
    }

    componentDidMount(){
        const {lang, setActiveLanguage, setActiveSideItem, handleGetTestData} = this.props;
        const {microTestResult, allScores, closeProfiles} = this.props.myResults;
        const {foodList} = this.props.myFoods;

        setActiveSideItem('home');
        setActiveLanguage(lang);

        // for getting test results
        if(Object.keys(microTestResult).length === 0 || allScores.length === 0 || closeProfiles.length === 0 || foodList.length === 0){
            handleGetTestData(lang)
                .then(() => {
                    return this.setState({
                        loading: false
                    });
                })
                .catch(err => {
                    if(err){
                        return this.setState({
                            loading: false,
                            analizError: err.kit_code ? err.kit_code : ''
                        });
                    }
                })
        }
    }

    render() {
        const {translate} = this.props;
        const {microTestResult, allScores, closeProfiles} = this.props.myResults;
        const {foodList} = this.props.myFoods;
        const {loading, foodError, analizError} = this.state;
        return (
            <Fragment>
                {loading ? 
                    <div className='loading'>
                        <div className='loading-logo'></div>
                    </div> : 
                    <Fragment>
                        <div className='wel-head'>
                            {translate('welcome-title', {firstName: 'Demo'})}
                        </div>
                        <div className='tabs-container'>
                            <MicroTestResultCard
                                translate={translate}
                                range={microTestResult.range}
                                age={microTestResult.Age}
                                errMessage={analizError}
                            />
                            <AllMyFoodsCard
                                translate={translate}
                                foodList={foodList}
                                errMessage={foodError}
                            />
                            <AllMyScoresCard
                                translate={translate}
                                allScores={allScores}
                                errMessage={analizError}
                                readMore={false}
                            />
                        </div>
                        <CloseProfileCard
                            translate={translate}
                            closeProfiles={closeProfiles}
                            errMessage={analizError}
                        />
                    </Fragment>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        translate: getTranslate(state.localize),
        currentUser: state.currentUser,
        myResults: state.myResults,
        myFoods: state.myFoods
    }
}

export default connect(mapStateToProps, {setActiveLanguage, setActiveSideItem, handleGetTestData})(HomeDemo)