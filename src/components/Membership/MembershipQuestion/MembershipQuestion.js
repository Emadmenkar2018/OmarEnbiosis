import React, { Fragment } from 'react'
import './MembershipQuestion.css'
import {Link} from 'react-router-dom'

const MembershipQuestion = ({translate, goLogin}) => {
    return (
        <Fragment>
            <div className='m-background-img'></div>
            <div className='m-content'>
                <div className='m-logo'></div>
                <div className='m-card'>
                    <div className='m-card-img'></div>
                    <div className='m-text'>
                        <p className='m-head'>{translate('reg-kit-title')}</p>
                        <div className='m-question'>
                            <p>{translate('memb-question')}</p>
                        </div>
                        <Link to='/register' className='go-r'>
                            {translate('memb-btn-no')}
                        </Link>
                        <button className='go-l' onClick={goLogin}>
                            {translate('memb-btn-yes')}
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MembershipQuestion;