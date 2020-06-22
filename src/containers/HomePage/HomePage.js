import React, { Component, Fragment } from 'react'
import './HomePage.css'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import {setActiveSideItem} from '../../store/actions/general'
import {handleGetAnalizeData} from '../../services/api'
import {handleGetAllFoods} from '../../store/actions/myFoods'
import MicroTestResultCard from '../../components/HomePage/MicroTestResultCard/MicroTestResultCard'
import CloseProfileCard from '../../components/HomePage/CloseProfileCard/CloseProfileCard'
import AllMyScoresCard from '../../components/HomePage/AllMyScoresCard/AllMyScoresCard'
import AllMyFoodsCard from '../../components/HomePage/AllMyFoodsCard/AllMyFoodsCard'
class HomePage extends Component {
    state = {
        loading: Object.keys(this.props.myResults.microTestResult).length === 0 || this.props.myResults.allScores.length === 0 || this.props.myResults.closeProfiles.length === 0,
        foodError: '',
        analizError: ''
    }

    componentDidMount(){
        const {currentUser, setActiveSideItem, handleGetAllFoods, handleGetAnalizeData} = this.props;
        const {microTestResult, allScores, closeProfiles} = this.props.myResults;
        const {foodList} = this.props.myFoods;
        const {kit_code} = currentUser.activeKit;
        
        setActiveSideItem('home');

        if(kit_code !== undefined){
            // for getting all foods
            if(foodList.length === 0){
                handleGetAllFoods(kit_code)
                    .then(() => {
                        return this.setState({
                            foodError: ''
                        });
                    })
                    .catch(err => {
                        if(err){
                            return this.setState({
                                foodError: err.kit_code
                            });
                        }
                    });
            }
    
            // for getting analize results
            if(Object.keys(microTestResult).length === 0 || allScores.length === 0 || closeProfiles.length === 0){
                handleGetAnalizeData(kit_code, false)
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
    }

    componentDidUpdate(prevProps){
        const {activeLanguage, currentUser, handleGetAllFoods, handleGetAnalizeData} = this.props;
        const {microTestResult, allScores, closeProfiles} = this.props.myResults;
        const {foodList} = this.props.myFoods;
        const {kit_code} = currentUser.activeKit;
        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            // for getting all foods
            if(foodList.length === 0){
                handleGetAllFoods(kit_code)
                    .then(() => {
                        return this.setState({
                            foodError: ''
                        });
                    })
                    .catch(err => {
                        if(err){
                            return this.setState({
                                foodError: err.kit_code
                            });
                        }
                    });
            }

            // for getting analize results
            if(Object.keys(microTestResult).length === 0 || allScores.length === 0 || closeProfiles.length === 0){
                handleGetAnalizeData(kit_code, false)
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
    }

    render() {
        const {translate, currentUser} = this.props;
        const {microTestResult, allScores, closeProfiles} = this.props.myResults;
        const {foodList} = this.props.myFoods;
        const {loading, foodError, analizError} = this.state;
        const firstName = currentUser.user.name.split(' ')[0];
        return (
            loading ? 
                <div className='loading'>
                    <div className='loading-logo'></div>
                </div> : 
                <Fragment>
                    <div className='wel-head'>
                        {translate('welcome-title', {firstName: firstName})}
                    </div>
                    <div className='tabs-container'>
                        <MicroTestResultCard
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
                            readMore={true}
                        />
                    </div>
                    <CloseProfileCard
                        translate={translate}
                        closeProfiles={closeProfiles}
                        errMessage={analizError}
                    />
                </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        currentUser: state.currentUser,
        myResults: state.myResults,
        myFoods: state.myFoods
    }
}

export default connect(mapStateToProps, {setActiveSideItem, handleGetAllFoods, handleGetAnalizeData})(HomePage);