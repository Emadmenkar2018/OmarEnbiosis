import React, { Component, Fragment } from 'react'
import './AllMyScores.css'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import CardHead from '../../../components/CardHead/CardHead'
import InfoSection from '../../../components/MyResults/InfoSection/InfoSection';
import ScoresList from '../../../components/MyResults/ScoresList//ScoresList'
import {setActiveSideItem} from '../../../store/actions/general'
import {handleGetAllScores} from '../../../store/actions/myResults'

class AllMyScores extends Component {
    state = {
        loading: this.props.myResults.allScores.length === 0,
        errMessage: ''
    }

    componentDidMount(){
        const {setActiveSideItem, currentUser, myResults, handleGetAllScores} = this.props;

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

    handleScoreClick = (scIndex, type, index, slug, e) => {
        const {history} = this.props;
        history.push({
            pathname: `/results/scores/${slug}`,
            state: {
                scIndex,
                type,
                index
            }
        });
    }

    render() {
        const colors = {
            kotu: '#e3614d',
            orta: '#edd1a1',
            iyi: '#59c5d9'
        }
        const {translate} = this.props;
        const {allScores} = this.props.myResults;
        const {loading, errMessage} = this.state;
        let allScoresList = [];
        if(allScores.length !== 0){
            allScoresList = allScores.map((score, index) => 
                <Fragment 
                    key={index}
                >
                    <InfoSection
                        sectionTitle={score.title}
                        titleColor={colors[score.analizType]}
                        titleWidth={`${score.title.length * 9.2}px`}
                    />
                    <ScoresList
                        scIndex={index}
                        analizeType={score.analizType}
                        items={score.items}
                        handleScoreClick={this.handleScoreClick}
                    />
                </Fragment>
            );
        }
        return (
            loading ? 
                <div className='loading'>
                    <div className='loading-logo'></div>
                </div> : 
                <div className='main-card'>
                    <CardHead
                        headIcon='analiz-sonuclari-icon.png'
                        smallText={translate('aS-smallText')}
                        pText={translate('aS-pText')}
                    />
                    {errMessage !== '' ? 
                        <div
                            style={{fontSize: '1.2rem', textAlign: 'center', textTransform: 'capitalize'}}
                        >
                            <strong>{errMessage}</strong>
                        </div> : 
                        <div className='score'>
                            {allScoresList}
                        </div>
                    }
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        currentUser: state.currentUser,
        myResults: state.myResults
    }
}

export default connect(mapStateToProps, {setActiveSideItem, handleGetAllScores})(AllMyScores);