import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getTranslate, setActiveLanguage } from 'react-localize-redux';
import MyFoodsHeader from '../../../components/MyFoods/MyFoodsHeader/MyFoodsHeader'
import SearchInput from '../../../components/MyFoods/Search/SearchInput'
import FoodList from '../../../components/MyFoods/Food/FoodList'
import {handleGetTestData} from '../../../services/api'
import {setActiveSideItem} from '../../../store/actions/general'
import {
    handleSetFilters,
    updateFoodType,
    updateFoodFilter,
    setFoodsToDisplay,
    setSearchValue
} from '../../../store/actions/myFoods'

class MyDemoFoods extends Component {
    state = {
        loading: this.props.myFoods.foodList.length === 0
    }

    componentDidMount(){
        const {lang, setActiveLanguage, setActiveSideItem, handleGetTestData, setFoodsToDisplay, myFoods} = this.props;

        setActiveSideItem('food');
        setActiveLanguage(lang);

        if(myFoods.foodList.length === 0){
            handleGetTestData(lang)
                .then(() => {
                    return this.setState({
                        loading: false
                    });
                })
                .catch(err => {
                    return this.setState({
                        loading: false
                    })
                });
        }else {
            this.setState({
                loading: false
            });
            setFoodsToDisplay();
        }
    }

    componentDidUpdate(prevProps){
        const {setFoodsToDisplay} = this.props;
        if(prevProps.myFoods.activeStatus !== this.props.myFoods.activeStatus){
            setFoodsToDisplay();
        }
    }

    render() {
        const {translate, handleSetFilters, updateFoodType, updateFoodFilter, setSearchValue, setFoodsToDisplay} = this.props;
        const {activeStatus, foodsToDisplay, searchValue, foodError} = this.props.myFoods;
        const {loading} = this.state;
        return (
            <Fragment>
                {loading ? 
                    <div className='loading'>
                        <div className='loading-logo'></div>
                    </div> : 
                    <div className='main-card'>
                        <MyFoodsHeader
                            handleSetFilters={handleSetFilters}
                            translate={translate}
                            activeStatus={activeStatus}
                            updateFoodType={updateFoodType}
                            updateFoodFilter={updateFoodFilter}
                            foodError={foodError}
                        />
                        <SearchInput
                            translate={translate}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            setFoodsToDisplay={setFoodsToDisplay}
                        />
                        {foodError !== '' ? 
                            <div
                                style={{
                                    fontSize: '1.2rem', 
                                    textAlign: 'center', 
                                    textTransform: 'capitalize',
                                    marginTop: 20
                                }}
                            >
                                <strong>{foodError}</strong>
                            </div> : 
                            foodsToDisplay.length !== 0 ? 
                                <FoodList
                                    foodsToDisplay={foodsToDisplay}
                                /> : 
                                searchValue !== '' ? 
                                <div className='no-data'>
                                    <strong>
                                        {translate('food-not-found-err')}...
                                    </strong>
                                </div> : 
                                <div className='no-data'>
                                    <strong>
                                        {translate('no-foods-err')}.
                                    </strong>
                                </div>
                        }
                    </div>
                }
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    return {
        translate: getTranslate(state.localize),
        myFoods: state.myFoods
    }
}

export default connect(mapStateToProps, {
    setActiveLanguage, 
    setActiveSideItem, 
    handleSetFilters, 
    handleGetTestData, 
    updateFoodType, 
    updateFoodFilter, 
    setFoodsToDisplay, 
    setSearchValue
})(MyDemoFoods);