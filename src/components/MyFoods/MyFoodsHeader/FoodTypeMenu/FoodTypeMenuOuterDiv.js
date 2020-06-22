import React, { Component } from 'react'

export default class FoodTypeMenuOuterDiv extends Component {
    state = {
        isShow: false
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node
    }

    handleClickOutside = (e) => {
        if(this.wrapperRef && !this.wrapperRef.contains(e.target)){
            this.setState({
                isShow: false
            });
        }
    }  

    handleShowFoodTypeMenu = (e) => {
        const {isShow} = this.state;
        this.setState({
            isShow: !isShow
        });
    }

    render() {
        const {isShow} = this.state;
        const childrenWithAdjustedProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
                isShow,
                handleShowFoodTypeMenu: this.handleShowFoodTypeMenu
            })
        );
        return (
            <div  style={{display: 'inline-block', marginLeft: 'auto'}}  ref={this.setWrapperRef}>
                {childrenWithAdjustedProps}
            </div>
        )
    }
}
