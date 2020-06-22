import React, { Component, Fragment } from 'react'
import './ReportFeatures.css'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import {handleGetAnalizeData, handleGetTaxForPDF} from '../../../services/api'
import {handleGetAllFoods} from '../../../store/actions/myFoods'
import {sendPDFReport} from '../../../services/api'
import {setSuccess, removeSuccess} from '../../../store/actions/messages'
import ShareReportFeature from '../../../components/MyAccount/ShareReportFeature/ShareReportFeature'
// import DownloadPDFReportFeature from '../../../components/MyAccount/DownloadPDFReportFeature/DownloadPDFReportFeature'

class ReportFeatures extends Component {
    state = {
        showModal: false,
        finished: false,
        loading: this.props.taxForPDF.length === 0 || this.props.closeProfiles.length === 0 || this.props.allScoresPDF.length === 0 || this.props.foodList.length === 0 || Object.keys(this.props.microTestResult).length === 0
    }

    componentDidMount(){
        const {currentUser, microTestResult, taxForPDF, closeProfiles, allScoresPDF, foodList, handleGetAnalizeData, handleGetTaxForPDF, handleGetAllFoods} = this.props;
        const {kit_code} = currentUser.activeKit;
        
        if(taxForPDF.length === 0){
            handleGetTaxForPDF(kit_code)
                .then(() => {
                    this.setState({
                        loading: false
                    })
                })
                .catch(err => {
                    return this.setState({
                        loading: false
                    })
                });
        }
        if(Object.keys(microTestResult).length === 0 || closeProfiles.length === 0 || allScoresPDF.length === 0){
            handleGetAnalizeData(kit_code, true)
                .then(() => {
                    return this.setState({
                        loading: false
                    })
                })
                .catch(err => {
                    return this.setState({
                        loading: false
                    })
                });
        }
        if(foodList.length === 0){
            handleGetAllFoods(kit_code)
                .then(() => {
                    return this.setState({
                        loading: false
                    })
                })
                .catch(err => {
                    return this.setState({
                        loading: false
                    })
                });
        }
    }

    componentDidUpdate(prevProps){
        const {activeLanguage, currentUser, handleGetAnalizeData, handleGetTaxForPDF, handleGetAllFoods} = this.props;
        const {kit_code} = currentUser.activeKit;

        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            handleGetTaxForPDF(kit_code)
                .then(() => {
                    this.setState({
                        loading: false
                    })
                })
                .catch(err => {
                    return this.setState({
                        loading: false
                    })
                });

            handleGetAnalizeData(kit_code, true)
                .then(() => {
                    return this.setState({
                        loading: false
                    })
                })
                .catch(err => {
                    return this.setState({
                        loading: false
                    })
                });

            handleGetAllFoods(kit_code)
                .then(() => {
                    return this.setState({
                        loading: false
                    })
                })
                .catch(err => {
                    return this.setState({
                        loading: false
                    })
                });
        }
    }

    render() {
        const {loading} = this.state;
        const {translate, microTestResult, taxForPDF, closeProfiles, allScoresPDF, foodList, sendPDFReport, success, setSuccess, removeSuccess} = this.props;
        const {activeKit, user} = this.props.currentUser;
        return (
            <Fragment>
                <ShareReportFeature
                    translate={translate}
                    activeKit={activeKit}
                    user={user}
                    microTestResult={microTestResult}
                    taxForPDF={taxForPDF}
                    closeProfiles={closeProfiles.slice(0, 8)}
                    allScoresPDF={allScoresPDF}
                    foodList={foodList}
                    success={success}
                    setSuccess={setSuccess}
                    removeSuccess={removeSuccess}
                    sendPDFReport={sendPDFReport}
                />
                {/* <DownloadPDFReportFeature
                    taxRefs={this.taxonomicRefsCollection}
                    closeRefs={this.closeProfilesRefsCollection}
                    allScoresRefs={this.allScoresRefsCollection}
                    activeKit={activeKit}
                    user={user}
                    microTestResult={microTestResult}
                    taxonomicResult={taxonomicResult}
                    closeProfiles={closeProfiles.slice(0, 8)}
                    allScores={allScores}
                    foodList={foodList}
                /> */}
                {loading && 
                    <div className='loading'>
                        <div className='loading-logo'></div>
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
        success: state.messages.success,
        currentUser: state.currentUser,
        microTestResult: state.myResults.microTestResult,
        taxForPDF: state.myResults.taxForPDF,
        closeProfiles: state.myResults.closeProfiles,
        allScoresPDF: state.myResults.allScoresPDF,
        foodList: state.myFoods.foodList
    }
}

export default connect(mapStateToProps, {handleGetAnalizeData, handleGetTaxForPDF, handleGetAllFoods, sendPDFReport, setSuccess, removeSuccess})(ReportFeatures);