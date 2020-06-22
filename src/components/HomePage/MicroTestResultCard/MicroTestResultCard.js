import React from 'react'
import './MicroTestResultCard.css'
import {Tabs, Tab} from 'react-bootstrap'

const MicroTestResultCard = ({range, age, errMessage}) => {
    const colors = {
        kotu: '#e3614d',
        orta: '#edd1a1',
        iyi: '#59c5d9'
    }
    let ageTab = null;
    let rangeTab = null;
    if(range && age && errMessage === ''){
        ageTab = 
            <Tab 
                key={0}
                eventKey='age' 
                title={`${age.head}`}
                tabClassName='age-tab'
            >
                <div className='micro-range'>
                    <div className='my-age'>
                        <div className='my-age-title'>
                            <strong>{age.title}</strong>
                        </div>
                        <div className='my-age-value'>
                            <strong>{age.value}</strong>
                        </div>
                    </div>
                </div>
            </Tab>;
        rangeTab = 
            <Tab 
                key={1}
                eventKey='range' 
                title={`${range.head}`}
                tabClassName='range-tab'
            >
                <div className='micro-range'>
                    <div className='my-range'>
                        <div className='my-range-value'>
                            <strong>{range.value}</strong>
                        </div>
                        <div 
                            className='my-range-title' 
                            style={{color: colors[range.rank]}}
                        >
                            {range.rank_title}
                        </div>
                    </div>
                </div>
            </Tab>
    }
    const testResultList = [rangeTab, ageTab];
    return (
        <div className='tab-card micro-test-card'>
            <Tabs id='microTestResultTab'>
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
                    testResultList
                }
            </Tabs>
        </div>
    )
}

export default MicroTestResultCard;