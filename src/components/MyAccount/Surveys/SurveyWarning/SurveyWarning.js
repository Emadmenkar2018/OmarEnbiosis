import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import {logout} from '../../../../store/actions/auth'

Modal.setAppElement('#root');

class SurveyWarning extends Component {
    render() {
        const {translate, currentUser, logout, history} = this.props;
        return (
            <Modal
                isOpen={true}
                className='Modal'
                overlayClassName='Overlay'
            >
                <div className='modal-wrapper'>
                    <div style={{
                        fontSize: '1.2rem', 
                        margin: 30, 
                        textAlign: 'center'
                    }}>
                        {translate('mA-survey-warn-title', {name: currentUser.user.name})}
                    </div>
                    <div className='btns-group' style={{
                        marginBottom: 30
                    }}>
                        <button className='n-btn' onClick={() => history.push('/account/survey')}>
                            {translate('mA-survey-warn-btn')}
                        </button>
                        <button className='r-btn' onClick={logout}>
                            {translate('logout-btn')}
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        translate: getTranslate(state.localize),
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {logout})(SurveyWarning)