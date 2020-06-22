import React, { Component } from 'react'
import './MySample.css'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Moment from 'moment'
import CardHead from '../../../components/CardHead/CardHead'
import SampleDateMenu from '../../../components/MyResults/SamplesDateMenu/SampleDateMenu'
import SampleDateMenuOuterDiv from '../../../components/MyResults/SamplesDateMenu/SampleDateMenuOuterDiv'
import InfoSection from '../../../components/MyResults/InfoSection/InfoSection'
import {setActiveSideItem} from '../../../store/actions/general'
import {handleSetActiveKit} from '../../../store/actions/auth'

class MySample extends Component {
    componentDidMount(){
        const {setActiveSideItem} = this.props;
        setActiveSideItem('result');
    }
    
    render() {
        const {activeLanguage, translate, handleSetActiveKit} = this.props;
        const {user, activeKit} = this.props.currentUser;
        const deliveredToCargo = activeKit.delevered_to_user_at !== null ? Moment(activeKit.delevered_to_user_at).format('MM/DD/YYYY') : '-';
        const receivedFromUser = activeKit.received_from_user_at !== null ? Moment(activeKit.received_from_user_at).format('MM/DD/YYYY') : '-';
        const sentToLab = activeKit.send_to_lab_at !== null ? Moment(activeKit.send_to_lab_at).format('MM/DD/YYYY') : '-';
        const resultsUploaded = activeKit.uploaded_at !== null ? Moment(activeKit.uploaded_at).format('MM/DD/YYYY') : '-';
        return (
            <div className='main-card'>
                <CardHead
                    headIcon='analiz-sonuclari-icon.png'
                    smallText={translate('mS-smallText')}
                    pText={translate('mS-pText')}
                />
                <SampleDateMenuOuterDiv>
                    <SampleDateMenu
                        kits={user.kits}
                        activeKit={activeKit}
                        handleSetActiveKit={handleSetActiveKit}
                    />
                </SampleDateMenuOuterDiv>
                <InfoSection
                    sectionTitle={translate('mS-first-sec')}
                    titleColor='#9cd9e6'
                    titleWidth={activeLanguage.code === 'tr' ? '125px' : '180px'}
                >
                    <div className='info-content'>
                        <div className='cont-1'>
                            <strong>{translate('cust-name')}:</strong>
                            {` ${user.name}`}
                        </div>
                        <div>
                            <strong>{translate('cust-gender')}:</strong>
                            {` ${user.gender === 1 ? translate('gender-male') : user.gender === 2 ? translate('gender-female') : '-'}`}
                        </div>
                    </div>
                    <div className='info-content'>
                        <div className='cont-1'>
                            <strong>{translate('cust-birthdate')}:</strong>
                            {` ${user.date_of_birth === null ? '-' : user.date_of_birth}`}
                        </div>
                        <div>
                            <strong>{translate('cust-email')}:</strong>
                            {` ${user.email}`}
                        </div>
                    </div>
                </InfoSection>

                <InfoSection
                    sectionTitle={translate('mS-second-sec')}
                    titleColor='#9cd9e6'
                    titleWidth={activeLanguage.code === 'tr' ? '115px' : '160px'}
                >
                    <div className='info-content'>
                        <div className='cont-1'>
                            <strong>{translate('test-name-lb')}:</strong>
                            &nbsp;{translate('test-name')}
                        </div>
                        <div className='cont-2'>
                            <strong>{translate('ordered-person')}:</strong>
                            &nbsp;{`${user.name}`}
                        </div>
                        <div>
                            <strong>{translate('sample-soruce')}:</strong>
                            &nbsp;Gaita
                        </div>
                    </div>
                    <div className='info-content'>
                        <div className='cont-1'>
                            <strong>{translate('mS-shipped')}:</strong>
                            {` ${deliveredToCargo}`}
                        </div>
                        <div>
                            <strong>{translate('mS-received')}:</strong>
                            &nbsp;{`${receivedFromUser}`}
                        </div>
                    </div>
                    <div className='info-content'>
                        <div className='cont-1'>
                            <strong>{translate('mS-sent')}:</strong>
                            &nbsp;{`${sentToLab}`}
                        </div>
                        <div>
                            <strong>{translate('mS-upload')}:</strong>
                            {` ${resultsUploaded}`}
                        </div>
                    </div>
                    <div className='info-content'>
                        <div className='cont-1'>
                            <strong>{translate('mS-kit-code')}:</strong>
                            {` ${activeKit.kit_code}`}
                        </div>
                    </div>
                </InfoSection>

                <InfoSection
                    sectionTitle={translate('mS-third-sec')}
                    titleColor='#9cd9e6'
                    titleWidth={activeLanguage.code === 'tr' ? '160px' : '185px'}
                >
                    <div className='info-content'>
                        <div className='cont-1'>
                            <div>Erciyes Üniversitesi Genom ve Kök Hücre Merkezi</div>
                            <div>Yenidoğan, Fakülte İçi Küme Evleri, 38280</div>
                            <div>Melikgazi/Kayseri</div>
                        </div>
                        <div>
                            <div>Harbiye, Atiye</div>
                            <div>Sokak. 8/4, 34367</div>
                            <div>Nişantaşı/Istanbul</div>
                        </div>
                    </div>
                    <div className='info-content'>
                        <div>+90 212 227 77 38</div>
                    </div>
                    <div>
                        <strong>{translate('mS-contact')}:</strong>
                        &nbsp;destek@enbiosis.com
                    </div>
                </InfoSection>
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

export default connect(mapStateToProps, {setActiveSideItem, handleSetActiveKit})(MySample);