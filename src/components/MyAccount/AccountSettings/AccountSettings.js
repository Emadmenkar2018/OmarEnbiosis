import React, { Component } from 'react'
import './AccountSettings.css'
import {connect} from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import AltHeader from '../../AltHeader/AltHeader'
import SettingCard from '../SettingCard/SettingCard'
import {setActiveSideItem} from '../../../store/actions/general'
import {setVegStatus} from '../../../store/actions/myAccount'

class AccountSettings extends Component {
    componentDidMount(){
        const {setActiveSideItem} = this.props;
        setActiveSideItem('account');
    }

    render(){
        const {translate, myAccount, setVegStatus} = this.props;
        return (
            <div className='main-card'>
                <AltHeader
                    btnTitle={translate('mA-smallText')}
                    goTo='/account'
                >
                    <div className='head-title'>
                        {translate('mA-setting')}
                    </div>
                    <hr/>
                </AltHeader>
                
                <SettingCard
                    translate={translate}
                    myAccount={myAccount}
                    setVegStatus={setVegStatus}
                />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        translate: getTranslate(state.localize),
        myAccount: state.myAccount
    }
}

export default connect(mapStateToProps, {setActiveSideItem, setVegStatus})(AccountSettings);