import React, {Fragment} from 'react'
import './MyScore.css'
import withWindowDimensions from '../../../../hoc/withWindowDimensions'

const MyScore = ({windowWidth, title, value, type}) => {
    const colors = {
        kotu: '#e3614d',
        orta: '#edd1a1',
        iyi: '#59c5d9'
    }
    let icon = null;
    switch(type){
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
    let leftPosition = +value < 3 ? 3 : +value > 95 ? 95 : +value;
    let titleFontSize = '1rem'
    if(windowWidth < 1690 && windowWidth >= 1400){
        leftPosition = +value < 3 ? 3 : +value > 94 ? 94 : +value;
    }else if(windowWidth < 1400 && windowWidth >= 980){
        leftPosition = +value < 3 ? 3 : +value > 93 ? 93 : +value;
    }else if(windowWidth < 980 && windowWidth >= 730){
        leftPosition = +value < 3 ? 3 : +value > 90 ? 90 : +value;
    }else if(windowWidth < 730){
        leftPosition = +value < 3 ? 3 : +value > 75 ? 75 : +value;
        titleFontSize = '0.8rem'
    }
    return (
        <div className='sample-micro-status' style={{left: `calc(${leftPosition}% - 20px)`, bottom: '105px'}}>
            <div className='my-score'>
                <div className='score-wrapper'>
                    <svg 
                        id="Layer_1" 
                        data-name="Layer 1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width='40' height='40'
                        viewBox="0 0 288.38 288.38"
                        className='score-icon'
                    >
                        {icon}
                        <text 
                            style={{fontSize: '7rem'}}
                            x='50%' 
                            y='65%' 
                            textAnchor="middle" 
                            fill='white'
                        >
                            {value}
                        </text>
                    </svg>
                    <div className='my-status-icon'></div>
                </div>
                <div className='my-title-wrapper'>
                    {title.split(' ').map((t, index) => 
                        <div 
                            key={index}
                            style={{color: colors[type], fontSize: titleFontSize}}
                        >
                            {t}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default withWindowDimensions(MyScore);