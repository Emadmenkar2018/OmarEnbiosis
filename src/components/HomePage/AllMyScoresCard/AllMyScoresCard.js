import React, { Fragment } from 'react'
import './AllMyScoresCard.css'
import {Link} from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap'
import SwipeableViewsContainer from '../SwipeableViewsContainer/SwipeableViewsContainer'

const AllMyScoresCard = ({translate, allScores, errMessage, readMore}) => {
    const colors = {
        kotu: '#e3614d',
        orta: '#edd1a1',
        iyi: '#59c5d9'
    }
    const scoresList = allScores.map((score, scIndex) => {
        let icon = null;
        switch(score.analizType){
            case 'iyi':
                icon = 
                    <Fragment>
                        <path 
                            fill='#59c5d9'
                            d="M199.6,288.38H88.78a13,13,0,0,1-13-13V13a13,13,0,0,1,13-13H199.6a13,13,0,0,1,13,13V275.35a13,13,0,0,1-13,13"
                        />
                        <path 
                            fill='#59c5d9'
                            d="M0,199.6V88.78a13,13,0,0,1,13-13H275.35a13,13,0,0,1,13,13V199.6a13,13,0,0,1-13,13H13a13,13,0,0,1-13-13"
                        />
                    </Fragment>
                break;
            case 'orta':
                icon = 
                    <path 
                        fill='#edd1a1'
                        d="M86.68,264.2,23.73,201.25a81,81,0,0,1,0-114.57l63-62.95a81,81,0,0,1,114.57,0l62.95,63a81,81,0,0,1,0,114.57L201.25,264.2a81,81,0,0,1-114.57,0"
                    />
                break;
            case 'kotu':
                icon = 
                    <Fragment>
                        <path 
                            fill='#e3614d'
                            d="M82.17,286.09,3.82,207.73a13,13,0,0,1,0-18.43L189.3,3.82a13,13,0,0,1,18.43,0l78.36,78.35a13,13,0,0,1,0,18.43L100.6,286.09a13,13,0,0,1-18.43,0"
                        />
                        <path 
                            fill='#e3614d'
                            d="M3.82,82.17,82.17,3.82a13,13,0,0,1,18.43,0L286.09,189.3a13,13,0,0,1,0,18.43l-78.36,78.36a13,13,0,0,1-18.43,0L3.82,100.6a13,13,0,0,1,0-18.43"
                        />
                    </Fragment>
                break;
            default:
                return <Fragment></Fragment>
        }
        return (
            <Tab 
                key={scIndex}
                eventKey={`${score.analizType}`}
                title={translate(`${score.analizType}-tab-title`)}
                tabClassName='score-tab'
            >
                <div className='flex-tab-container'>
                    <SwipeableViewsContainer
                        interval={15000}
                    >
                        {score.items.length === 0 ? 
                            <div className='score-tab-container' style={{fontSize: '1.2rem'}}>
                                {translate('scores-card-err')}
                            </div> : 
                            score.items.slice(0, 3).map((item, index) =>
                                <div className='score-tab-container' key={index}>
                                    <div className='score-info'>
                                        <div className='score-wrapper'>
                                            <svg 
                                                id="Layer_1"
                                                data-name="Layer 1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 288.38 288.38"
                                                className='all-score-icon'
                                            >
                                                {icon}
                                                <text 
                                                    style={{fontSize: '6rem'}}
                                                    x='50%' 
                                                    y='65%' 
                                                    textAnchor="middle" 
                                                    fill='white'
                                                >
                                                    {item.scores[0].value}
                                                </text>
                                            </svg>
                                            <div 
                                                className='score-title'
                                                style={{
                                                    color: colors[score.analizType]
                                                }}
                                            >
                                                {item.scores[0].title}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='score-desc'>
                                        <div>
                                            {item.head}
                                        </div>
                                        {readMore && 
                                            <Link 
                                                to={{
                                                    pathname: `/results/scores/${item.slug}`,
                                                    state: {
                                                        scIndex,
                                                        type: score.analizType,
                                                        index
                                                    }
                                                }}
                                                className='more-info'
                                            >
                                                {translate('read-more')}
                                            </Link>
                                        }
                                    </div>
                                </div>
                        )}
                    </SwipeableViewsContainer>
                </div>
            </Tab>
        )}
    );
    return (
        <div className='tab-card all-scores-card'>
            <Tabs id='allScoresTab'>
                {errMessage !== '' ? 
                    <Tab
                        eventKey={`err`}
                        title={`Analiz Yok`}
                        tabClassName='score-tab'
                    >
                        <div className='err-container'>
                            {errMessage}
                        </div>
                    </Tab> : 
                    scoresList
                }
            </Tabs>
        </div>
    )
}

export default AllMyScoresCard;