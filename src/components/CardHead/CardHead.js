import React, {Fragment, Component} from 'react'
import './CardHead.css'

class CardHead extends Component {
    headIcon = require(`../../static/images/Icons/Head-Icons/${this.props.headIcon}`);
    render(){
        const {smallText, pText, specialName} = this.props;
        return (
            <div className='head'>
                <img className='icon' src={this.headIcon} alt={smallText}/>
                <div className='text'>
                    <small>{smallText}</small>
                    <hr/>
                    <p className='main-head'>
                        {pText}{specialName && 
                            <Fragment>
                                , <strong>{specialName}</strong>
                            </Fragment>
                        }
                    </p>
                </div>
            </div>
        )
    }
}

export default CardHead;