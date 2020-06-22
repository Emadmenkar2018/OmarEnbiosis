import React from 'react'
import './Navbar.css'
import 'flag-icon-css/css/flag-icon.min.css'
import logo from '../../static/images/logo.png'
import {Link} from 'react-router-dom'

const Navbar = ({
    translate, 
    activeLanguage, 
    showSettingMenu, 
    handleShowSettingMenu, 
    showLangMenu, 
    handleShowLangMenu, 
    handleChangeLanguage, 
    showSideNavbar, 
    toggleSideNavbar, 
    user, 
    activeKit, 
    handleSetActiveKit, 
    logout, 
    history
}) => {
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        history.push('/');
    }

    const handleDateClick = (kit) => {
        handleSetActiveKit(kit);
        handleShowSettingMenu();
        history.push('/');
    }

    let kitsList = null;
    if(Object.keys(activeKit).length !== 0){
        kitsList = user.kits.map(kit => {
            const kitDate = kit.registered_at.split(' ')[0];
            return (
                <button
                    key={kit.id}
                    className={`${kit.id === activeKit.id ? 'selected' : ''}`}
                    onClick={() => handleDateClick(kit)}
                >
                    EMA - {kitDate}
                </button>
            )
        })
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-light top-navbar'>
            <div className='navbar-brand-wrapper'>
                <button onClick={() => toggleSideNavbar(!showSideNavbar)} className='sidebar-toggler'>
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <img className='navbar-brand' src={logo} alt='User Background'/>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarContent'>
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item'>
                        <Link to='/account' className='nav-link profile-name'>
                            <div className='topnav-icon profile-icon'>
                                <div className='profile-status'></div>
                            </div>
                            <div className='link-label'>
                                {`${user.name ? user.name : 'DEMO DEMO'}`}
                            </div>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <div className="setting-dropdown"> 
                            <button onClick={handleShowSettingMenu} className="dropbtn nav-link">
                                <div className='topnav-icon settings-icon'></div>
                                <div className='link-label'>
                                    {translate('analysis-btn')}
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="15" height="15"
                                    viewBox="0 0 172 172"
                                    className='arrow-icon'
                                    id='arrow-icon'
                                >
                                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                                        <path d="M0,172v-172h172v172z" fill="none"></path>
                                        <g fill="#565d68">
                                            <path d="M17.2,68.8v-11.46667c0,-2.21307 1.27853,-4.2312 3.27947,-5.18293c2.00093,-0.95173 4.3688,-0.65933 6.0888,0.74533l59.43173,48.63013l59.43747,-48.63013c1.71427,-1.40467 4.08213,-1.69133 6.0888,-0.74533c2.00667,0.946 3.27373,2.96987 3.27373,5.18293v11.46667c0,1.72 -0.774,3.34827 -2.10413,4.4376l-63.06667,51.6c-2.1156,1.72573 -5.14853,1.72573 -7.26413,0l-63.06667,-51.6c-1.3244,-1.08933 -2.0984,-2.7176 -2.0984,-4.4376z"></path>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            <div 
                                className='setting-dropdown-content'
                                style={{
                                    height: showSettingMenu ? user.kits.length < 4 ? user.kits.length * 51 : 3 * 51 : 0,
                                    opacity: showSettingMenu ? 1 : 0,
                                    overflow: user.kits.length < 4 ?  'hidden' : 'auto'
                                }}
                            >
                                {kitsList}
                            </div>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <div className="setting-dropdown lang-dropdown">
                            <button onClick={handleShowLangMenu} className="dropbtn lang-btn nav-link">
                                <i className="fas fa-globe lang-icon"></i>
                                <div className='link-label'>
                                    {translate('lang-btn')}
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="15" height="15"
                                    viewBox="0 0 172 172"
                                    className='arrow-icon lang-arrow'
                                    id='arrow-icon'
                                >
                                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                                        <path d="M0,172v-172h172v172z" fill="none"></path>
                                        <g fill="#565d68">
                                            <path d="M17.2,68.8v-11.46667c0,-2.21307 1.27853,-4.2312 3.27947,-5.18293c2.00093,-0.95173 4.3688,-0.65933 6.0888,0.74533l59.43173,48.63013l59.43747,-48.63013c1.71427,-1.40467 4.08213,-1.69133 6.0888,-0.74533c2.00667,0.946 3.27373,2.96987 3.27373,5.18293v11.46667c0,1.72 -0.774,3.34827 -2.10413,4.4376l-63.06667,51.6c-2.1156,1.72573 -5.14853,1.72573 -7.26413,0l-63.06667,-51.6c-1.3244,-1.08933 -2.0984,-2.7176 -2.0984,-4.4376z"></path>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            <div 
                                className='setting-dropdown-content'
                                style={{
                                    height: showLangMenu ? 102 : 0,
                                    opacity: showLangMenu ? 1 : 0,
                                    overflow: 'hidden'
                                }}
                            >
                                <button
                                    className={`${activeLanguage.code === 'tr' ? 'selected' : ''}`}
                                    onClick={() => handleChangeLanguage('tr')}
                                >
                                    <span className="flag-icon flag-icon-tr"></span>
                                    Turkçe
                                </button>
                                <button
                                    className={`${activeLanguage.code === 'en' ? 'selected' : ''}`}
                                    onClick={() => handleChangeLanguage('en')}
                                >
                                    <span className="flag-icon flag-icon-gb"></span>
                                    English
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <button onClick={handleLogout} className='nav-link logout'>
                            <div className='topnav-icon logout-icon'></div>
                            <div className='link-label'>
                                {translate('logout-btn')}
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
