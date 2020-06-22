import React, { Component, Fragment } from 'react'
import './MyFoods.css'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import MyFoodsHeader from '../../components/MyFoods/MyFoodsHeader/MyFoodsHeader'
import SearchInput from '../../components/MyFoods/Search/SearchInput'
import FoodList from '../../components/MyFoods/Food/FoodList'
import {setActiveSideItem} from '../../store/actions/general'
import {
    handleSetFilters, 
    updateFoodType, 
    updateFoodFilter, 
    setFoodsToDisplay, 
    handleGetAllFoods, 
    setSearchValue
} from '../../store/actions/myFoods'

class MyFoods extends Component {
    state = {
        loading: this.props.myFoods.foodList.length === 0
    }
    
    componentDidMount(){
        const {setActiveSideItem, handleGetAllFoods, setFoodsToDisplay, myFoods, currentUser} = this.props;
        
        setActiveSideItem('food');

        if(myFoods.foodList.length === 0){
            const kitCode = currentUser.activeKit.kit_code;
            handleGetAllFoods(kitCode)
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
        const {activeLanguage, currentUser, handleGetAllFoods, setFoodsToDisplay} = this.props;
        const kitCode = currentUser.activeKit.kit_code;

        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            handleGetAllFoods(kitCode)
                .then(() => {
                    return this.setState({
                        loading: false
                    });
                })
                .catch(err => {
                    return this.setState({
                        loading: false
                    });
                });
        }else if(prevProps.myFoods.activeStatus !== this.props.myFoods.activeStatus){
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
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        currentUser: state.currentUser,
        myFoods: state.myFoods
    }
}

export default connect(mapStateToProps, {
    setActiveSideItem, 
    handleSetFilters, 
    updateFoodType, 
    updateFoodFilter, 
    setFoodsToDisplay, 
    handleGetAllFoods,
    setSearchValue
})(MyFoods);