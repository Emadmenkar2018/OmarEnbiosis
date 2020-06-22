import React, { Component, Fragment } from 'react'
import './SwipeableViewsContainer.css'
import SwipeableViews from 'react-swipeable-views';
import SwipeableViewsControls from '../SwipeableViewsControls/SwipeableViewsControls'
import { autoPlay } from 'react-swipeable-views-utils';
import DotPagination from '../../MyAccount/DotPagination/DotPagination'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class SwipeableViewsContainer extends Component {
    state = {
        currentSlide: 0
    };

    next = () => {
        const {currentSlide} = this.state;
        const {children} = this.props;
        const childrenCount = children.length;
        if(childrenCount){
            const checkCount = currentSlide === childrenCount - 1;
            this.setState((state) => ({
                currentSlide: checkCount ? 0 : state.currentSlide + 1
            }));
        }
    };

    prev = () => {
        const {currentSlide} = this.state;
        const {children} = this.props;
        const childrenCount = children.length;
        if(childrenCount){
            const checkCount = currentSlide === 0;
            this.setState((state) => ({
                currentSlide: checkCount ? childrenCount - 1 : state.currentSlide - 1
            }));
        }
    };

    updateCurrentSlide = (index) => {
        const { currentSlide } = this.state;
        if (currentSlide !== index) {
            this.setState({
                currentSlide: index
            });
        }
    };

    render() {
        const {currentSlide} = this.state;
        const {children, interval} = this.props;
        const childrenCount = children.length;
        return (
            <Fragment>
                <div className='views-container' >
                    <AutoPlaySwipeableViews 
                        index={currentSlide}
                        onChangeIndex={this.updateCurrentSlide}
                        enableMouseEvents
                        interval={interval}
                        className='home-swiper'
                    >
                        {children}
                    </AutoPlaySwipeableViews>
                    <SwipeableViewsControls
                        next={this.next}
                        prev={this.prev}
                    />
                </div>
                <DotPagination 
                    dots={childrenCount}
                    currentSlide={currentSlide}
                    onChangeIndex={this.updateCurrentSlide}
                    disableSection={true}
                    isHome={true}
                />
            </Fragment>
        )
    }
}
