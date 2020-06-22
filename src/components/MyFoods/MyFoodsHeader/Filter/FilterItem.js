import React from 'react'
import './FilterItem.css'

const FilterItem = ({filter, updateFilter}) => {
    const {id, filterTitle, shortcut, isActive} = filter;
    return (
        <li onClick={updateFilter.bind(this, id)} className={`filter-item ${isActive ? 'filter-item-active' : ''}`}>
            <button className={`filter-item-btn ${isActive ? 'filter-btn-active' : ''}`}>
                <strong>{shortcut}</strong>
            </button>
            {filterTitle}
        </li>
    )
}

export default FilterItem;