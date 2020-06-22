import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import NavbarOuterDiv from '../../components/Navbar/NavbarOuterDiv'
import Navbar from '../../components/Navbar/Navbar'
import SideNavbarOuterDiv from '../../components/SideNavbar/SideNavbarOuterDiv'
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import UserRoutes from '../../components/Routes/UserRoutes'
import NonActiveKitRoutes from '../../components/Routes/NonActiveKitRoutes'
import NonTestResultRoutes from '../../components/Routes/NonTestResultRoutes'
import {toggleSideNavbar, handleSetLanguage} from '../../store/actions/general'
import {logout, handleSetActiveKit} from '../../store/actions/auth'

const MainContainer = ({
	activeLanguage, 
	translate, 
	activeItem, 
	showSideNavbar, 
	toggleSideNavbar, 
	handleSetLanguage, 
	currentUser, 
	handleSetActiveKit, 
	logout, 
	history
}) => (
	<Fragment>
		<div className='u-background'></div>
		{currentUser.isAuthenticated ? 
			<Fragment>
				<NavbarOuterDiv
					handleSetLanguage={handleSetLanguage}
				>
					<Navbar
						translate={translate}
						activeLanguage={activeLanguage}
						showSideNavbar={showSideNavbar}
						toggleSideNavbar={toggleSideNavbar}
						user={currentUser.user}
						activeKit={currentUser.activeKit}
						handleSetActiveKit={handleSetActiveKit}
						logout={logout}
						history={history}
					/>
				</NavbarOuterDiv>
				<div className='main-container'>
					<SideNavbarOuterDiv>
						<SideNavbar
							translate={translate}
							activeItem={activeItem}
							showSideNavbar={showSideNavbar}
							toggleSideNavbar={toggleSideNavbar}
							currentUser={currentUser}
						/>
					</SideNavbarOuterDiv>
					<div className='main-content'>
						{currentUser.activeKit.survey_id === null ? 
						<NonActiveKitRoutes/> : 
						!currentUser.activeKit.show ? 
						<NonTestResultRoutes/> : 
						<UserRoutes/>
						}
					</div>
				</div>
			</Fragment> : 
			<div className='loading'>
				<div className='loading-logo'></div>
			</div>
		}
	</Fragment>
)

const mapStateToProps = (state) => {
	return {
		activeLanguage: getActiveLanguage(state.localize),
		translate: getTranslate(state.localize),
		activeItem: state.ui.activeItem,
		showSideNavbar: state.ui.showSideNavbar,
		currentUser: state.currentUser
	}
}

export default connect(mapStateToProps, {
	handleSetLanguage, 
	logout, 
	toggleSideNavbar, 
	handleSetActiveKit
})(MainContainer);