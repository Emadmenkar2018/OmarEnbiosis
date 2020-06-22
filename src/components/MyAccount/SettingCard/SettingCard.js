import React, { Component } from 'react'
import './SettingCard.css'
import {Collapse, Card} from 'react-bootstrap'
import Switch from 'react-switch'

export default class SettingCard extends Component {
    state = {
        isOpen: true
    }

    handleCollapse = (e) => {
        e.preventDefault();
        const {isOpen} = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }

    handleSwitch = (checked) => {
        const {setVegStatus} = this.props;
        setVegStatus(checked);
    }

    render() {
        const {isOpen} = this.state;
        const {translate} = this.props;
        const {isVeg} = this.props.myAccount;
        return (
            <Card className='setting-card'>
                <Card.Header>
                    <button onClick={this.handleCollapse} className='collapse-btn' type="button" data-toggle="collapse" data-target={`#setting-collapse`} aria-expanded="false" aria-controls={`setting-collapse`}>
                        <strong>{translate('mA-diet-set')}</strong>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="24" height="24"
                            viewBox="0 0 172 172"
                            className={`arrow-icon ${isOpen && 'active-arrow-icon'}`}
                            id='arrow-icon'
                        >
                            <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" >
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#565d68">
                                    <path d="M154.8,103.2v11.46667c0,2.21307 -1.27853,4.2312 -3.27947,5.18293c-2.00093,0.95173 -4.3688,0.65933 -6.0888,-0.74533l-59.43173,-48.63013l-59.43747,48.63013c-1.71427,1.40467 -4.08213,1.69133 -6.0888,0.74533c-2.00667,-0.946 -3.27373,-2.96987 -3.27373,-5.18293v-11.46667c0,-1.72 0.774,-3.34827 2.10413,-4.4376l63.06667,-51.6c2.1156,-1.72573 5.14853,-1.72573 7.26413,0l63.06667,51.6c1.3244,1.08933 2.0984,2.7176 2.0984,4.4376z"></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </Card.Header>
                <Collapse in={isOpen}>
                    <div id={`setting-collapse`}>
                        <Card.Body className='setting-body'>
                            <hr/>
                            <div className='setting-content'>
                                <div className='setting-option'>
                                    {translate('mA-veg')}
                                </div>
                                <div>
                                    <label className='switch-label'>
                                        <span className='switch-status'>
                                            {isVeg ? 
                                                translate('mA-yes') : 
                                                translate('mA-no')
                                            }
                                        </span>
                                        <Switch 
                                            onChange={this.handleSwitch}
                                            checked={isVeg}
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                            height={25}
                                            width={75}
                                            onColor='#f1f2f3'
                                            offColor='#f1f2f3'
                                            offHandleColor='#fe685a'
                                            onHandleColor='#45c045'
                                        />
                                    </label>
                                </div>
                            </div>
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>
        )
    }
}
