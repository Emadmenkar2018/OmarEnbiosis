import React, { Fragment, Component } from 'react'
import './ScoreDetails.css'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import AltHeader from '../../AltHeader/AltHeader'
import DetailsVideo from './DetailsVideo/DetailsVideo'
import NormalScore from './NormalScore/NormalScore'
import MyScore from './MyScore/MyScore'
import ScoreKeys from './ScoreKeys/ScoreKeys'
import {setActiveSideItem} from '../../../store/actions/general'
import {handleGetAllScores} from '../../../store/actions/myResults'

class ScoreDetails extends Component {
    state = {
        loading: this.props.myResults.allScores.length === 0
    }

    componentDidMount(){
        const {currentUser, myResults, setActiveSideItem, handleGetAllScores} = this.props;
        setActiveSideItem('result');
        if(myResults.allScores.length === 0){
            const kitCode = currentUser.activeKit.kit_code;
            handleGetAllScores(kitCode)
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

    componentDidUpdate(prevProps){
        const {activeLanguage, currentUser, handleGetAllScores} = this.props;
        const kitCode = currentUser.activeKit.kit_code;

        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            handleGetAllScores(kitCode)
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

    render(){
        const {translate, scIndex, index, type, myResults} = this.props;
        const {loading} = this.state;
        let score = null;
        let colorGradient = '';
        let otherScores = [];
        let myScore = [];
        if(myResults.allScores.length !== 0){
            score = myResults.allScores[scIndex].items[index];
            const {colorScale, scores} = score;
            colorGradient = colorScale.reduce((accumulator, currentValue, index, src) => {
                if(index === src.length - 1){
                    return `${accumulator}${currentValue.color} ${currentValue.rate}%`
                }
                return `${accumulator}${currentValue.color} ${currentValue.rate}%, `
            }, '');
            otherScores = scores.filter(sc => !sc.isMy)
                .sort((a, b) => (a.value > b.value) ? 1 : -1)
                .map((sc, index, arr) => 
                    <div 
                        key={index}
                        className='sample-micro-status-wrapper'
                    >
                        <NormalScore
                            title={sc.title}
                            value={sc.value}
                            prevValue={index !== 0 ? arr[index - 1].value : 0}
                        />
                    </div>
                );
            myScore = scores.filter(sc => sc.isMy)
                .map((sc, index) => 
                    <div 
                        key={index}
                        className='sample-micro-status-wrapper'
                    >
                        <MyScore
                            title={sc.title}
                            value={sc.value}
                            type={type}
                        />
                    </div>
                )
        }
        return (
            loading ? 
                <div className='loading'>
                    <div className='loading-logo'></div>
                </div> : 
                <Fragment>
                    <div className='main-card score-details'>
                        <AltHeader
                            btnTitle={translate('aS-btn-title')}
                            goTo='/results/scores'
                        >
                            <small>
                                {translate('aS-gut-title')}
                            </small>
                            <hr/>
                            <div className='head-title'>
                                {score !== null && score.head}
                            </div>
                        </AltHeader>
                        <div className='details-content'>
                            <div className='content-text'>
                                {score !== null && score.desc.map((d, index) => 
                                    d !== '' ? 
                                        <p key={index}>
                                            {d}.
                                        </p> : 
                                        null
                                )}
                            </div>
                            <DetailsVideo/>
                        </div>
                    </div>
        
                    <div className='main-card'>
                        <div className='sample-head'>
                            <div className='sample-title'>
                                {translate('aS-my-score-title')}
                            </div>
                            <hr/>
                        </div>
                        <div style={{height: 300, display: 'flex', width: '100%', paddingTop: 30}}>
                            <div 
                                className='sample-micro-age'
                                style={{
                                    background: `linear-gradient(90deg, ${colorGradient})`
                                }}
                            >
                                {otherScores}
                                {myScore}
                            </div>
                        </div>
                        <ScoreKeys
                            translate={translate}
                            scoreKeys={score !== null && score.scoreKeys}
                        />
                    </div>
                </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        currentUser: state.currentUser,
        myResults: state.myResults
    }
}

export default connect(mapStateToProps, {setActiveSideItem, handleGetAllScores})(ScoreDetails);