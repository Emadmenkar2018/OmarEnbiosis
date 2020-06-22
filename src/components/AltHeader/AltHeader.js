import React from 'react'
import './AltHeader.css'
import {useHistory} from 'react-router-dom'

const AltHeader = ({btnTitle, goTo, ...props}) => {
    let history = useHistory()
    const handleGoBack = (e) => {
        e.preventDefault();
        history.push(goTo);
    }

    return (
        <div className='details-head'>
            <button onClick={handleGoBack} className='back-btn'>
                <i className="fas fa-arrow-left"></i>
                {btnTitle}
            </button>
            <div className='head-text'>
                {props.children}
            </div>
        </div>
    )
}

export default AltHeader;