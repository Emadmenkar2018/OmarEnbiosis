import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import CardHead from '../../../components/CardHead/CardHead'
import CloseProfilesList from '../../../components/MyResults/CloseProfilesList/CloseProfilesList'
import {setActiveSideItem} from '../../../store/actions/general'
import {handleGetCloseProfiles} from '../../../store/actions/myResults'

class CloseProfiles extends Component {
    state = {
        loading: this.props.myResults.closeProfiles.length === 0,
        errMessage: ''
    }
    
    componentDidMount(){
        const {setActiveSideItem, currentUser, myResults, handleGetCloseProfiles} = this.props;

        setActiveSideItem('result');

        if(myResults.closeProfiles.length === 0){
            const kitCode = currentUser.activeKit.kit_code;
            handleGetCloseProfiles(kitCode)
                .then(() => {
                    return this.setState({
                        loading: false,
                        errMessage: ''
                    });
                })
                .catch(err => {
                    return this.setState({
                        loading: false,
                        errMessage: err.kit_code
                    });
                });
        }
    }

    componentDidUpdate(prevProps){
        const {activeLanguage, currentUser, handleGetCloseProfiles} = this.props;
        const kitCode = currentUser.activeKit.kit_code;

        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            handleGetCloseProfiles(kitCode)
                .then(() => {
                    return this.setState({
                        loading: false,
                        errMessage: ''
                    });
                })
                .catch(err => {
                    return this.setState({
                        loading: false,
                        errMessage: err.kit_code
                    });
                });
        }
    }

    render() {
        const {translate} = this.props;
        const {closeProfiles} = this.props.myResults;
        const {loading, errMessage} = this.state;
        return (
            <Fragment>
                {loading ? 
                    <div className='loading'>
                        <div className='loading-logo'></div>
                    </div> : 
                    <div className='main-card'>
                        <CardHead
                            headIcon='analiz-sonuclari-icon.png'
                            smallText={translate('cP-smallText')}
                            pText={translate('cP-pText')}
                        />
                        <div>
                            {`${translate('cP-desc')}`}
                        </div>
                        {errMessage !== '' ? 
                            <div
                                style={{fontSize: '1.2rem', textAlign: 'center', textTransform: 'capitalize'}}
                            >
                                <strong>{errMessage}</strong>
                            </div> : 
                            <CloseProfilesList
                                closeProfiles={closeProfiles}
                            />
                        }
                    </div>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        currentUser: state.currentUser,
        myResults: state.myResults
    }
}

export default connect(mapStateToProps, {setActiveSideItem, handleGetCloseProfiles})(CloseProfiles);