import React, { Component } from 'react'
import './SampleTracking.css'
import {connect} from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import Moment from 'moment'
import AltHeader from '../../../components/AltHeader/AltHeader'
import {Collapse, Card} from 'react-bootstrap'
import TrackStatus from '../../../components/MyAccount/TrackStatus/TrackStatus'
import {setActiveSideItem} from '../../../store/actions/general'

class SampleTracking extends Component {
    state = {
        isOpen: true
    }

    componentDidMount(){
        const {setActiveSideItem} = this.props;
        setActiveSideItem('account');
    }

    handleCollapse = (e) => {
        e.preventDefault();
        const {isOpen} = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }

    handleRedirecting = (path, e) => {
        const {history} = this.props;
        history.push(path);
    }

    render() {
        const {isOpen} = this.state;
        const {translate, activeKit} = this.props;
        const statusList = [];
        const registeredAt = Moment(activeKit.registered_at).format('MM/DD/YYYY');
        const deliveredToCargo = activeKit.delevered_to_user_at !== null ? Moment(activeKit.delevered_to_user_at).format('MMM DD, YYYY') : null;
        statusList.push({
            title: translate('mS-shipped'),
            date: deliveredToCargo
        });
        const receivedFromUser = activeKit.received_from_user_at !== null ? Moment(activeKit.received_from_user_at).format('MMM DD, YYYY') : null;
        statusList.push({
            title: translate('mS-received'),
            date: receivedFromUser
        });
        const sentToLab = activeKit.send_to_lab_at !== null ? Moment(activeKit.send_to_lab_at).format('MMM DD, YYYY') : null;
        statusList.push({
            title: translate('mS-sent'),
            date: sentToLab
        });
        const resultsUploaded = activeKit.uploaded_at !== null ? Moment(activeKit.uploaded_at).format('MMM DD, YYYY') : null;
        statusList.push({
            title: translate('mS-upload'),
            date: resultsUploaded
        });
        const trackList = statusList.map((status, index) => 
            <TrackStatus
                key={index}
                title={status.title}
                date={status.date}
            />
        );
        const approvedStatuses = statusList.filter(status => status.date !== null);
        return (
            <div className='main-card'>
                <AltHeader
                    btnTitle={translate('mA-smallText')}
                    goTo='/account'
                >
                    <div className='head-title'>
                        {translate('mA-track')}
                    </div>
                    <hr/>
                </AltHeader>

                <Card className='sample-track-card'>
                    <Card.Header>
                        <button onClick={this.handleCollapse} className='collapse-btn' type="button" data-toggle="collapse" data-target={`#sample-track-collapse`} aria-expanded="false" aria-controls={`sample-track-collapse`}>
                            <div className='sample-track-icon'></div>
                            <div className='sample-track-title'>
                                <strong>{translate('test-name')}</strong>
                                <div className='register-date'>
                                    <strong>{translate('mA-register-date')}:</strong> {registeredAt}
                                </div>
                                <div className='sample-id'>
                                    <strong>{translate('mS-kit-code')}:</strong> {activeKit.kit_code}
                                </div>
                            </div>
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
                        <div id={`sample-track-collapse`}>
                            <Card.Body className='sample-track-body'>
                                <hr/>
                                <div className='sample-track-content-head'>
                                    <small>{translate('mA-status')}</small>
                                    <div className='status-title'>
                                        <strong>
                                            {approvedStatuses.length !== 0 ? 
                                                approvedStatuses[approvedStatuses.length - 1].title : '-'
                                            }
                                        </strong>
                                    </div>
                                </div>
                                {trackList}
                                <div className='sample-track-btns'>
                                    <button onClick={this.handleRedirecting.bind(this, '/foods/intro')}>
                                        {translate('mA-intro-btn')}
                                    </button>
                                    <button onClick={this.handleRedirecting.bind(this, '/results/mySample')}>
                                        {translate('mA-sample')}
                                    </button>
                                </div>
                            </Card.Body>
                        </div>
                    </Collapse>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        translate: getTranslate(state.localize),
        activeKit: state.currentUser.activeKit
    }
}

export default connect(mapStateToProps, {setActiveSideItem})(SampleTracking);