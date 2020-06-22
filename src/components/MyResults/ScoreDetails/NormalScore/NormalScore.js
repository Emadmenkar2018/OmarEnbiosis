import React from 'react'
import './NormalScore.css'
import withWindowDimensions from '../../../../hoc/withWindowDimensions'

const NormalScore = ({windowWidth, title, value, prevValue}) => {
    const difference = +value - +prevValue;
    let leftPosition = difference < 9 ? +value + 2 : +value;
    let titleFontSize = '1rem'
    if(windowWidth < 905 && windowWidth >= 730){
        leftPosition = difference < 9 ? +value + 4 : +value;
    }else if(windowWidth < 730){
        leftPosition = difference < 9 ? +value + 10 : difference === 11 || difference === 10 ? +value + 3 :  difference === 12 ? +value + 5 : +value;
        titleFontSize = '0.75rem'
    }
    return (
        <div className='sample-micro-status' style={{left: `calc(${leftPosition}% - 60px)`}}>
            <div className='status-icon'></div>
            {title.split(' ').map((t, index) => 
                <div 
                    key={index}
                    style={{fontSize: titleFontSize}}
                >
                    {t}
                </div>
            )}
            <strong>{value}</strong>
        </div>
    )
}

export default withWindowDimensions(NormalScore);