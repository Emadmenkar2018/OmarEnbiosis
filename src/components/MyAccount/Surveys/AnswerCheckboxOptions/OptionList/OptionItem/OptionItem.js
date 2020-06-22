import React, {Fragment, Component} from 'react'

class OptionItem extends Component{
    state = {
        conditionalAnswer: this.props.conditionalAnswer
    }

    handleChange = (checked) => {
        const {index, addOption, removeOption} = this.props;
        const {conditionalAnswer} = this.state;
        !checked ? 
            addOption({
                [`"${index}"`]: conditionalAnswer === '' ? null : conditionalAnswer
            }) : 
            removeOption(index);
    }

    handleCondChange = (e) => {
        const {index, updateOption} = this.props;
        this.setState({
            [e.target.name]: e.target.value
        });
        updateOption(index, e.target.value);
    }

    render(){
        const {translate, groupId, option, checked, disabled} = this.props;
        const {conditionalAnswer} = this.state;
        return (
            <li>
                <label className='checkbox-container'>
                    <input
                        type='checkbox'
                        name={`checkbox-group-${groupId}`}
                        value={option.title}
                        checked={checked}
                        onChange={this.handleChange.bind(this, checked)}
                        disabled={disabled}
                    />
                    <span className='checkbox-checkmark'></span>
                    {option.title}
                </label>
                {option.is_if && 
                    checked && 
                        <Fragment>
                            <div className='conditional-title'>
                                {option.is_if}
                            </div>
                            <input
                                className='answer-input'
                                style={{width: '100%', marginBottom: 10}}
                                type='text'
                                name='conditionalAnswer'
                                placeholder={translate('mA-text-input')}
                                value={conditionalAnswer}
                                onChange={this.handleCondChange}
                                disabled={disabled}
                            />
                        </Fragment>
                }
            </li>
        )
    }
}

export default OptionItem;