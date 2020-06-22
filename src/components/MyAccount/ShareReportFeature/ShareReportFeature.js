import React, { Component, Fragment } from 'react'
import './ShareReportFeature.css'
import AccountCard from '../AccountCard/AccountCard'
import Modal from 'react-modal'

Modal.setAppElement('#root');

export default class ShareReportFeature extends Component {
    state = {
        loading: false,
        showModal: false,
        sendPDF: false,
        shareEmail: ''
    }
    
    componentDidUpdate(){
        const {showModal, loading} = this.state;
        const {success, removeSuccess} = this.props;
        if(showModal && loading){
            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 1000);
        }

        if(success !== ''){
            setTimeout(() => {
                removeSuccess();
            }, 5000)
        }
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
    
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleShareReport = (e) => {
        e.preventDefault();
        const {activeKit, user, microTestResult, taxForPDF, closeProfiles, allScoresPDF, foodList, sendPDFReport} = this.props;
        const {shareEmail} = this.state;
        const pdfData = {
            shareEmail, 
            userName: user.name, 
            kitCode: activeKit.kit_code, 
            registerDate: activeKit.registered_at.split(' ')[0], 
            microTestResult, 
            taxForPDF, 
            closeProfiles: closeProfiles.slice(0, 8), 
            allScoresPDF, 
            foodList
        }
        this.setState({
            sendPDF: true
        })
        sendPDFReport(pdfData)
            .then(({microBase64, foodBase64}) => {
                // let foodBlob = this.convertBase64ToBlob(foodBase64);
                // console.log(foodBlob);
                // this.foodViewer.src = URL.createObjectURL(foodBlob);
                // this.foodViewer.src = microbiomeBase64;
                return this.setState({
                    sendPDF: false
                })
            })
            .catch(err => {
                return this.setState({
                    sendPDF: false
                })
            });
    }

    // for converting the pdf to a base64 url
    convertBase64ToBlob = (base64String) => {
        const parts = base64String.split(';base64,');
        const mimeType = 'application/pdf'
        const decodedData = window.atob(parts[1]);
        const uInt8Array = new Uint8Array(decodedData.length);

        for(let i = 0; i < decodedData.length; i++){
            uInt8Array[i] = decodedData.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: mimeType});
    }

    render() {
        const {showModal, loading, sendPDF, shareEmail} = this.state;
        const {translate, activeKit, success} = this.props;
        return (
            <Fragment>
                <AccountCard
                    title={translate('mA-share')}
                    altTitle='ornek-takibi'
                    imageUrl='share.png'
                    click={activeKit.microbiome !== null || activeKit.food !== null ? this.handleOpenModal : null}
                />
                {/* <iframe
                    ref={element => this.foodViewer = element}
                    width={'100%'}
                    height={600}
                    title='foodPDF'
                /> */}
                <Modal
                    isOpen={showModal}
                    onRequestClose={this.handleCloseModal}
                    className='Modal'
                    overlayClassName='Overlay'
                >
                    <Fragment>
                        {success !== '' && 
                            <div className='alert alert-success m-4 text-center'>
                                {success}
                            </div>
                        }
                        <div className='modal-wrapper'>
                            {(loading || sendPDF) && 
                                <div className='loading'>
                                    <div className='loading-logo'></div>
                                </div>
                            }
                            <div className='modal-title'>
                                {translate('mA-share-model-title')}
                            </div>
                            <form className='share-rapor-form' onSubmit={this.handleShareReport}>
                                <input
                                    type='email'
                                    className='modal-email-input'
                                    name='shareEmail'
                                    required
                                    placeholder={translate('mA-share-model-input')}
                                    onChange={this.handleChange}
                                    value={shareEmail}
                                />
                                <button className='share-btn'>
                                    {translate('mA-share-model-btn')}
                                </button>
                            </form>
                            <div className='modal-desc'>
                                {translate('mA-share-model-warn')}
                            </div>
                        </div>
                    </Fragment>
                </Modal>
            </Fragment>
        )
    }
}
