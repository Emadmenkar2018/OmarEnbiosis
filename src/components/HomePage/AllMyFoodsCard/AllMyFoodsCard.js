import React, {Fragment} from 'react'
import './AllMyFoodsCard.css'
import {Tabs, Tab} from 'react-bootstrap'
import SwipeableViewsContainer from '../SwipeableViewsContainer/SwipeableViewsContainer'

const AllMyFoodsCard = ({translate, foodList, errMessage}) => {
    let rankedFoodList = null;
    if(errMessage === '' && foodList.length !== 0){
        const allFoods = foodList.find(food => 
            food.id === 'Tümü'
        ).foodItems;
        rankedFoodList = allFoods.map((food,index) => {
            let icon = null;
            switch(food.rank){
                case 'iyi':
                    icon = 
                        <Fragment>
                            <path 
                                fill='#59c5d9'
                                stroke='white'
                                strokeWidth='10px'
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
                            stroke='white'
                            strokeWidth='10px'
                            d="M86.68,264.2,23.73,201.25a81,81,0,0,1,0-114.57l63-62.95a81,81,0,0,1,114.57,0l62.95,63a81,81,0,0,1,0,114.57L201.25,264.2a81,81,0,0,1-114.57,0"
                        />
                    break;
                case 'kotu':
                    icon = 
                        <Fragment>
                            <path 
                                fill='#e3614d'
                                stroke='white'
                                strokeWidth='10px'
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
                    key={index}
                    eventKey={`${food.rank}`}
                    title={translate(`${food.rank}-tab-title`)}
                    tabClassName='score-tab'
                >
                    <div className='close-profile-container'>
                        <SwipeableViewsContainer
                            interval={9000}
                        >
                            {food.items.length === 0 ? 
                                <div className='foods-container' style={{fontSize: '1.2rem'}}>
                                    {translate('foods-card-err')}
                                </div> : 
                                food.items.slice(0, 10).map(item => 
                                    <div className='foods-container' key={item.foodId}>
                                        <div className='food-img-container'>
                                            <img className='food-img' src={item.imageUrl} alt={item.altTitle}/>
                                            <svg 
                                                id="Layer_1" 
                                                data-name="Layer 1" 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="35" height="35"
                                                viewBox="0 0 288.38 288.38"
                                                className='score-icon home-score-icon'
                                            >
                                                {icon}
                                                <text 
                                                    style={{fontSize: '7rem'}}
                                                    x='50%' 
                                                    y='65%' 
                                                    textAnchor="middle" 
                                                    fill='white'
                                                >
                                                    {item.foodValue}
                                                </text>
                                            </svg>
                                        </div>
                                        <div className='home-food-title'>
                                            {item.foodTitle}
                                        </div>
                                    </div>
                            )}
                        </SwipeableViewsContainer>
                    </div>
                </Tab>
            )
        });
    }
    return (
        <div className='tab-card all-foods-card'>
            <Tabs id='allScoresTab'>
                {errMessage !== '' ? 
                    <Tab
                        eventKey={`err`}
                        title={`Besinler Yok`}
                        tabClassName='score-tab'
                    >
                        <div className='err-container'>
                            {errMessage}
                        </div>
                    </Tab> : 
                    rankedFoodList
                }
            </Tabs>
        </div>
    )
}

export default AllMyFoodsCard;