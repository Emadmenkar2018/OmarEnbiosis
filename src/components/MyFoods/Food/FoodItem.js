import React, { Fragment } from 'react'
import './FoodItem.css'
import withWindowDimensions from '../../../hoc/withWindowDimensions'

const FoodItem = ({windowWidth, foodInfo}) => {
    const {foodTitle, foodValue, altTitle, imageUrl, rank_icon} = foodInfo;
    let icon = null;
    switch(rank_icon){
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
        <div className='food-item-card'>
            <img className='item-image' src={imageUrl} alt={altTitle}/>
            <strong className='item-text'>{foodTitle}</strong>
            <svg 
                id="Layer_1" 
                data-name="Layer 1" 
                xmlns="http://www.w3.org/2000/svg" 
                width={`${windowWidth < 414 ? 35 : 40}`} height={`${windowWidth < 414 ? 35 : 40}`}
                viewBox="0 0 288.38 288.38"
                className='rank-icon'
            >
                {icon}
                <text x='50%' y='65%' textAnchor="middle" fill='white'>{foodValue}</text>
            </svg>
        </div>
    )
}

export default withWindowDimensions(FoodItem);