import React from 'react'
import './FoodList.css'
import FoodItem from './FoodItem'

const FoodList = ({foodsToDisplay}) => {
    const foodList = foodsToDisplay.map(food => 
        <FoodItem
            key={food.foodId}
            foodInfo={food}
        />
    );
    return (
        <div className='food-container'>
            {foodList}
        </div>
    )
}

export default FoodList;