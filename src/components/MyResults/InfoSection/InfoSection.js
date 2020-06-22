import React from 'react'
import './InfoSection.css'

const InfoSection = ({sectionTitle, titleColor, titleWidth, ...props}) => {
    return (
        <div className='info-wrapper'>
            <div className='info-head'>
                <div className='info-title' style={{width: titleWidth, color: titleColor}}>
                    {sectionTitle}
                </div>
                <hr style={{width: `calc(100% - ${titleWidth})`}}/>
            </div>
            {props.children}
        </div>
    )
}

export default InfoSection;