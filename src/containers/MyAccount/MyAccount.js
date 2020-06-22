import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import CardHead from '../../components/CardHead/CardHead'
import AccountCard from '../../components/MyAccount/AccountCard/AccountCard'
import ReportFeatures from './ReportFeatures/ReportFeatures'
import {setActiveSideItem} from '../../store/actions/general'
class MyAccount extends Component {
    componentDidMount(){
        const {setActiveSideItem} = this.props;
        setActiveSideItem('account');
    }

    handleRedirecting = (path, e) => {
        const {history} = this.props;
        history.push(path);
    }
    
    render() {
        const {translate, currentUser} = this.props;
        return (
            <div className='main-card'>
                <CardHead
                    headIcon='hesabim-icon.png'
                    smallText={translate('mA-smallText')}
                    pText={translate('mA-pText')}
                    specialName={currentUser.user.name.split(' ')[0]}
                />
                
                <AccountCard
                    title={translate('mA-track')}
                    altTitle='ornek-takibi'
                    imageUrl='mail.png'
                    click={this.handleRedirecting.bind(this, '/account/sample-tracking')}
                />
                <AccountCard
                    title={translate('mA-sugg')}
                    altTitle='besin-onerileri'
                    imageUrl='suggest.png'
                    click={this.handleRedirecting.bind(this, '/foods/intro')}
                />
                <AccountCard
                    title={translate('mA-setting')}
                    altTitle='ayarlar'
                    imageUrl='gears.png'
                    click={this.handleRedirecting.bind(this, '/settings')}
                />
                <AccountCard
                    title={translate('mA-survey')}
                    altTitle='anket'
                    imageUrl='question.png'
                    click={this.handleRedirecting.bind(this, '/account/survey')}
                />
                
                <ReportFeatures/>

                <AccountCard
                    title={translate('mA-order')}
                    altTitle='ornek-takibi'
                    imageUrl='order.png'
                    click={this.handleRedirecting.bind(this, '/account/order-kit')}
                />
                <AccountCard
                    title={translate('mA-register')}
                    altTitle='ornek-takibi'
                    imageUrl='qr-code.png'
                    click={this.handleRedirecting.bind(this, '/register')}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {setActiveSideItem})(MyAccount);