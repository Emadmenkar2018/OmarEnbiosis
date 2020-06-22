import React from 'react'
import OptionItem from './OptionItem/OptionItem'

const OptionList = ({translate, question, selectedOptions, addOption, removeOption, updateOption, disabled}) => {
    let optionlist = question.option_name.map((option, index) => {
        const selectedOption = selectedOptions.find(selecOption => Object.keys(selecOption)[0] === `"${index}"`);
        return <OptionItem
            key={index}
            index={index}
            translate={translate}
            groupId={question.id}
            option={option}
            checked={selectedOption ? true : false}
            conditionalAnswer={selectedOption ? selectedOption[Object.keys(selectedOption)[0]] : ''}
            addOption={addOption}
            removeOption={removeOption}
            updateOption={updateOption}
            disabled={disabled}
        />
    });
    return (
        <ul className='options-list'>
            {optionlist}
        </ul>
    )
}

export default OptionList;