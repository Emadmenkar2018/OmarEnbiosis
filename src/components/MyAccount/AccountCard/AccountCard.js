import React, { Component } from 'react'
import './AccountCard.css'

class AccountCard extends Component {
    item_image = require(`../../../static/images/Icons/${this.props.imageUrl}`);
    render() {
        const {title, altTitle, click} = this.props;
        return (
            <div onClick={click} className='account-card'>
                <div className='card-icon'>
                    <img src={this.item_image} alt={altTitle}/>
                </div>
                <div className='account-card-title'>
                    <strong>{title}</strong>
                </div>
                <div className='right-arrow-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="25" height="25"
                        viewBox="0 0 172 172"
                    >
                        <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                            <path d="M0,172v-172h172v172z" fill="none"></path>
                            <g fill="#565d68">
                                <path d="M68.8,154.8h-11.46667c-2.21307,0 -4.2312,-1.27853 -5.18293,-3.27947c-0.95173,-2.00093 -0.65933,-4.3688 0.74533,-6.0888l48.63013,-59.43173l-48.63013,-59.43747c-1.40467,-1.71427 -1.69133,-4.08213 -0.74533,-6.0888c0.946,-2.00667 2.96987,-3.27373 5.18293,-3.27373h11.46667c1.72,0 3.34827,0.774 4.4376,2.10413l51.6,63.06667c1.72573,2.1156 1.72573,5.14853 0,7.26413l-51.6,63.06667c-1.08933,1.3244 -2.7176,2.0984 -4.4376,2.0984z"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}

export default AccountCard;