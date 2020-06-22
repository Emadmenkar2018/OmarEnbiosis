import React from 'react'
import OptionItem from './OptionItem/OptionItem'

const OptionList = ({translate, question, selectedOption, optionChange, disabled}) => {
    const conditionalAnswer = Object.keys(selectedOption).length !== 0 ? selectedOption[Object.keys(selectedOption)[0]] : '';
    let optionList = question.option_name.map((option, index) => {
        const checked = Object.keys(selectedOption)[0] === `"${index}"`;
        return <OptionItem
            key={index}
            index={index}
            translate={translate}
            groupId={question.id}
            option={option}
            checked={checked}
            conditionalAnswer={conditionalAnswer === null ? '' : conditionalAnswer}
            selectedOption={selectedOption}
            optionChange={optionChange}
            disabled={disabled}
        />
    });
    return (
        <ul className='options-list'>
            {optionList}
        </ul>
    )
}

export default OptionList;