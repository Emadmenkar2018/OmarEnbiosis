import React, { Component } from 'react'

export default class SideNavbarOuterDiv extends Component {
    state = {
        showFoodMenu: false,
        showResultMenu: false
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
                showFoodMenu: false,
                showResultMenu: false
            });
        }
    }

    handleShowFoodMenu = (e) => {
        const {showFoodMenu} = this.state;
        this.setState({
            showFoodMenu: !showFoodMenu,
            showResultMenu: false
        });
    }
    
    handleShowResultMenu = (e) => {
        const {showResultMenu} = this.state;
        this.setState({
            showResultMenu: !showResultMenu,
            showFoodMenu: false
        });
    }

    render() {
        const {showFoodMenu, showResultMenu} = this.state;
        const childrenWithAdjustedProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
                showFoodMenu,
                showResultMenu,
                handleShowFoodMenu: this.handleShowFoodMenu,
                handleShowResultMenu: this.handleShowResultMenu
            })
        );
        return (
            <div ref={this.setWrapperRef}>
                {childrenWithAdjustedProps}
            </div>
        )
    }
}
