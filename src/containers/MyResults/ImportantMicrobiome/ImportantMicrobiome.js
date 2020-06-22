import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import CardHead from '../../../components/CardHead/CardHead'
import SampleDateMenu from '../../../components/MyResults/SamplesDateMenu/SampleDateMenu'
import SampleDateMenuOuterDiv from '../../../components/MyResults/SamplesDateMenu/SampleDateMenuOuterDiv'
import ImportantMicrosList from '../../../components/MyResults/ImportantMicrosList/ImportantMicrosList'
import {setActiveSideItem} from '../../../store/actions/general'
import {handleGetImportantMicros} from '../../../store/actions/myResults'
import {handleSetActiveKit} from '../../../store/actions/auth'

class ImportantMicrobiome extends Component {
    state = {
        loading: this.props.myResults.importantMicros.length === 0,
        errMessage: ''
    }

    componentDidMount(){
        const {setActiveSideItem, currentUser, myResults, handleGetImportantMicros} = this.props;

        setActiveSideItem('result');

        if(myResults.importantMicros.length === 0){
            const kitCode = currentUser.activeKit.kit_code;
            handleGetImportantMicros(kitCode)
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
        const {activeLanguage, currentUser, handleGetImportantMicros} = this.props;
        const kitCode = currentUser.activeKit.kit_code;
        if((prevProps.currentUser.activeKit !== currentUser.activeKit) || (activeLanguage !== prevProps.activeLanguage)){
            this.setState({
                loading: true
            });
            handleGetImportantMicros(kitCode)
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
        const {translate, handleSetActiveKit} = this.props;
        const {importantMicros} = this.props.myResults;
        const {user, activeKit} = this.props.currentUser;
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
                            smallText={translate('iM-smallText')}
                            pText={translate('iM-pText')}
                        />
                        <SampleDateMenuOuterDiv>
                            <SampleDateMenu
                                kits={user.kits}
                                activeKit={activeKit}
                                handleSetActiveKit={handleSetActiveKit}
                            />
                        </SampleDateMenuOuterDiv>
                        {errMessage !== '' ? 
                            <div
                                style={{fontSize: '1.2rem', textAlign: 'center', textTransform: 'capitalize'}}
                            >
                                <strong>{errMessage}</strong>
                            </div> : 
                            <ImportantMicrosList
                                importantMicros={importantMicros}
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

export default connect(mapStateToProps, {setActiveSideItem, handleGetImportantMicros, handleSetActiveKit})(ImportantMicrobiome);