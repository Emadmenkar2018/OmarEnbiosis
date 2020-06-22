import React from 'react'
import './DotPagination.css'

const DotPagination = ({dots, currentSlide, onChangeIndex, disableSection, isHome}) => {
    const dotList = [...Array(dots)].map((dot, index) => 
        <div
            key={index}
            className={`dot ${currentSlide === index ? 'checked' : ''}`}
            onClick={() => disableSection && onChangeIndex(index)}
        >
        </div>
    );
    
    return (
        <div className={`control-dots ${isHome ? 'home-dots' : ''}`}>
            {dotList}
        </div>
    )
}

export default DotPagination;