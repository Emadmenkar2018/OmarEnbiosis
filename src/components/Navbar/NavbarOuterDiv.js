import React, { Component } from 'react'

export default class NavbarOuterDiv extends Component {
    state = {
        showSettingMenu: false, 
        showLangMenu: false
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
                showSettingMenu: false, 
                showLangMenu: false
            });
        }
    }
    
    handleShowSettingMenu = (e) => {
        const {showSettingMenu} = this.state;
        this.setState({
            showSettingMenu: !showSettingMenu, 
            showLangMenu: false
        });
    }

    handleShowLangMenu = (e) => {
        const {showLangMenu} = this.state;
        this.setState({
            showLangMenu: !showLangMenu, 
            showSettingMenu: false
        });
    }

    handleChangeLanguage = (lang) => {
        const {handleSetLanguage} = this.props;
        handleSetLanguage(lang);
        this.setState({
            showLangMenu: false
        });
    }

    render() {
        const {showSettingMenu, showLangMenu} = this.state;
        const childrenWithAdjustedProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
                showSettingMenu, 
                handleShowSettingMenu: this.handleShowSettingMenu, 
                showLangMenu, 
                handleShowLangMenu: this.handleShowLangMenu, 
                handleChangeLanguage: this.handleChangeLanguage
            })
        );
        return (
            <div ref={this.setWrapperRef}>
                {childrenWithAdjustedProps}
            </div>
        )
    }
}
