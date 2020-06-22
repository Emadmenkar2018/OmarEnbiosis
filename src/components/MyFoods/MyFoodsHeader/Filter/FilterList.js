import React from 'react'
import './FilterList.css'
import FilterItem from './FilterItem'

const FilterList = ({foodFilters, updateFilter}) => {
    const filterList = foodFilters.map(filter => (
        <FilterItem
            key={filter.id}
            filter={filter}
            updateFilter={updateFilter}
        />
    ));
    return (
        <ul className='filter-list'>
            {filterList}
        </ul>
    )
}

export default FilterList;