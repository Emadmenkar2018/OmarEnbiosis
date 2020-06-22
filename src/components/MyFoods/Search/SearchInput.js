import React, { Component } from 'react'
import './SearchInput.css'

export default class SearchInput extends Component {
    state = {
        isFocus: false
    }

    handleChange = (e) => {
        const {setSearchValue, setFoodsToDisplay} = this.props;
        setSearchValue(e.target.value);
        setFoodsToDisplay();
    }

    handleFocusBlur = (e) => {
        const {isFocus} = this.state;
        this.setState({
            isFocus: !isFocus
        });
    }

    render() {
        const {isFocus} = this.state;
        const {translate, searchValue} = this.props;
        return (
            // <div className={`search ${isFocus ? 'search-focus' : ''}`}>
                // <i className={`fas fa-search ${isFocus ? 'search-icon-focus' : ''}`}></i>
                <input 
                    className={`food-search-input ${isFocus ? 'food-search-input-focus' : ''}`}
                    type='text'
                    name='searchText'
                    placeholder={translate('search')}
                    onChange={this.handleChange}
                    onFocus={this.handleFocusBlur}
                    onBlur={this.handleFocusBlur}
                    value={searchValue}
                />
            // </div>
        )
    }
}
