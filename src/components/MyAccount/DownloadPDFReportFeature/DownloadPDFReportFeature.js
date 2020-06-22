import React, { Component, Fragment } from 'react'
import './DownloadPDFReportFeature.css'
import Modal from 'react-modal'
import AccountCard from '../../../components/MyAccount/AccountCard/AccountCard'
import ResultPDFReport from './ResultPDFReport/ResultPDFReport'
import FoodPDFReport from './FoodPDFReport/FoodPDFReport'

Modal.setAppElement('#root');

class DownloadPDFReportFeature extends Component {
    state = {
        showModal: false
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
    
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const {showModal} = this.state;
        const {taxRefs, closeRefs, allScoresRefs, activeKit, user, microTestResult, taxonomicResult, closeProfiles, allScores, foodList} = this.props;
        return (
            <Fragment>
                <AccountCard
                    title='Raporumu İndir'
                    altTitle='rapor-indir'
                    imageUrl='share.png'
                    click={activeKit.microbiome !== null || activeKit.food !== null ? this.handleOpenModal : null}
                />
                <Modal
                    isOpen={showModal}
                    onRequestClose={this.handleCloseModal}
                    className='PDF-Modal'
                    overlayClassName='Overlay'
                >
                    <div className='modal-wrapper'>
                        <div className='pdf-download-title'>
                            Sizin Raporunuzu Görmek veya İndirmek için Aşağdaki Butonlar Tıklıyabilirsiniz
                        </div>
                        <ResultPDFReport
                            activeKit={activeKit}
                            user={user}
                            microTestResult={microTestResult}
                            taxonomicResult={taxonomicResult}
                            taxRefs={taxRefs}
                            closeProfiles={closeProfiles.slice(0, 8)}
                            closeRefs={closeRefs}
                            allScores={allScores}
                            allScoresRefs={allScoresRefs}
                        />
                        <FoodPDFReport
                            activeKit={activeKit}
                            user={user}
                            foodList={foodList}
                        />
                    </div>
                </Modal>
            </Fragment>
        )
    }
}

export default DownloadPDFReportFeature;