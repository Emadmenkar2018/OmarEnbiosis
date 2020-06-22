import React, { Fragment } from 'react'
import './SideNavbar.css'
import { Link } from 'react-router-dom';
import Moment from 'moment'
import withWindowDimensions from '../../hoc/withWindowDimensions'

const SideNavbar = ({
    windowWidth,
    translate,
    activeItem,
    showSideNavbar,
    toggleSideNavbar,
    showResultMenu,
    handleShowResultMenu,
    currentUser
}) => {
    const nowDate = Moment();
    const completedDate = Moment(currentUser.user.kits[0].registered_at).add(90, 'days')
    const isDurationCompleted = completedDate.diff(nowDate, 'days') <= 0;
    return (
        <Fragment>
            {showSideNavbar && 
                <div onClick={() => toggleSideNavbar(false)} className='side-content-overlay'>
                    <div className='side-overlay'></div>
                </div>
            }
            <div className={`side-content ${windowWidth <= 1024 && showSideNavbar ? 'sideNav-active' : ''}`}>
                <nav className='side-navbar'>
                    <ul className='side-list'>
                        <li className={activeItem === 'home' ? 'active' : ''} id='home'>
                            <div className='side-icon home-icon'></div>
                            <Link 
                                onClick={() => toggleSideNavbar(false)} 
                                to='/home'
                            >
                                {translate('home-btn')}
                            </Link>
                        </li>
                        <li className={activeItem === 'account' ? 'active' : ''} id='account'>
                            <div className='side-icon account-icon'></div>
                            <Link 
                                onClick={() => toggleSideNavbar(false)} 
                                to='/account'
                            >
                                {translate('account-btn')}
                            </Link>
                        </li>
                        <li className={activeItem === 'food' ? 'active' : ''} id='food'>
                            <div className='side-icon food-icon'></div>
                            <Link 
                                onClick={() => toggleSideNavbar(false)} 
                                to='/foods'
                            >
                                {translate('food-btn')}
                            </Link>
                        </li>
                        <div onClick={handleShowResultMenu} className='dropdown'>
                            <li className={activeItem === 'result' ? 'active' : ''} id='result'>
                                <div className='side-icon result-icon'></div>
                                {translate('result-btn')}
                            </li>
                            <div 
                                className={`dropdown-content`}
                                style={{
                                    height: showResultMenu ? 220 : 0,
                                    opacity: showResultMenu ? 1 : 0
                                }}
                            >
                                <Link 
                                    onClick={() => toggleSideNavbar(false)} 
                                    to='/results/scores'
                                >
                                    {translate('gut-btn')}
                                </Link>
                                <Link 
                                    onClick={() => toggleSideNavbar(false)} 
                                    to='/results/important-microbiome'
                                >
                                    {translate('imp-btn')}
                                </Link>
                                <Link 
                                    onClick={() => toggleSideNavbar(false)} 
                                    to='/results/taxonomic'
                                >
                                    {translate('tax-btn')}
                                </Link>
                                <Link 
                                    onClick={() => toggleSideNavbar(false)} 
                                    to='/results/close-profiles'
                                >
                                    {translate('close-btn')}
                                </Link>
                                <Link 
                                    onClick={() => toggleSideNavbar(false)} 
                                    to='/results/mySample'
                                >
                                    {translate('sample-btn')}
                                </Link>
                            </div>
                        </div>
                        <li className={activeItem === 'resource' ? 'active' : ''} id='resource'>
                            <div className='side-icon resource-icon'></div>
                            <Link 
                                onClick={() => toggleSideNavbar(false)} 
                                to='/resources'
                            >
                                {translate('res-btn')}
                            </Link>
                        </li>
                    </ul>
                </nav>
                {isDurationCompleted && 
                    <div className='register-kit'>
                        <h5>{translate('90-day')}</h5>
                        <div>{translate('90-day-desc')}</div>
                        <Link to='/register'>{translate('order-kit')}</Link>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default withWindowDimensions(SideNavbar);