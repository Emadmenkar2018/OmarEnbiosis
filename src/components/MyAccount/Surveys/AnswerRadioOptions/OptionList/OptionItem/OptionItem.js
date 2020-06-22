import React, {Fragment, Component} from 'react'

class OptionItem extends Component {
    state = {
        conditionalAnswer: this.props.conditionalAnswer
    }

    handleChange = (e) => {
        const {index, optionChange} = this.props;
        optionChange({
            [`"${index}"`]: null
        });
    }

    handleCondChange = (e) => {
        const {index, optionChange} = this.props;
        this.setState({
            [e.target.name]: e.target.value
        });
        optionChange({
            [`"${index}"`]: e.target.value === '' ? null : e.target.value
        });
    }

    render(){
        const {translate, groupId, option, checked, disabled} = this.props;
        const {conditionalAnswer} = this.state;
        return (
            <li>
                <label className='label-container'>
                    <input
                        type="radio"
                        name={`radio-group-${groupId}`}
                        value={option.title}
                        checked={checked}
                        onChange={this.handleChange}
                        disabled={disabled}
                    />
                    <span className="checkmark"></span>
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