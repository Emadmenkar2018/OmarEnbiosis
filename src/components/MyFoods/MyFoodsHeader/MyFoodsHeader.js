import React, { Component, Fragment } from 'react'
import './MyFoodsHeader.css'
import CardHead from '../../CardHead/CardHead'
import FoodTypeMenuOuterDiv from './FoodTypeMenu/FoodTypeMenuOuterDiv'
import FoodTypeMenu from './FoodTypeMenu/FoodTypeMenu'
import FilterList from './Filter/FilterList'

export default class MyFoodsHeader extends Component {
    componentDidMount(){
        const {translate, handleSetFilters} = this.props;
        handleSetFilters(translate);
    }
    
    handleCollapse = (e) => {
        e.preventDefault();
        const {isOpen} = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }

    render() {
        const {translate, activeStatus, updateFoodType, updateFoodFilter, foodError} = this.props;
        let foodTypeTitle = '';
        if(activeStatus.foodTypes.length !== 0){
            foodTypeTitle = activeStatus.foodTypes.find(fType => fType.isActive === true).title;
        }
        return (
            <Fragment>
                <CardHead
                    headIcon='besin-skorlari-icon.png'
                    smallText={translate('mF-smallText')}
                    pText={foodTypeTitle}
                />
                <div className='food-menu-wrapper'>
                    <strong>{translate('filter')}</strong>
                    <FoodTypeMenuOuterDiv>
                        <FoodTypeMenu
                            foodTypeTitle={foodTypeTitle}
                            foodTypes={activeStatus.foodTypes}
                            updateFoodType={updateFoodType}
                            foodError={foodError}
                        />
                    </FoodTypeMenuOuterDiv>
                </div>
                <div className='filter-content'>
                    <FilterList
                        foodFilters={activeStatus.foodFilters}
                        updateFilter={updateFoodFilter}
                    />
                </div>
            </Fragment>
        )
    }
}
