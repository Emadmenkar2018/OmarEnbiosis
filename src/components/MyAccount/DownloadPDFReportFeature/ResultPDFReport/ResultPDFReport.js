import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas'
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import {svgToPng} from '../../../../services/api'
import ResultDoc from './ResultDoc/ResultDoc'

const close_WIDTH = 160;
const close_HEIGHT = 160;
let taxImgs = {}
let closeImgs = {}
let allScoresImgs = {}

class ResultPDFReport extends Component {
    state = {
        showResultPDF: false,
        loading: Object.keys(taxImgs).length === 0 || Object.keys(closeImgs).length === 0 || Object.keys(allScoresImgs).length === 0
    }

    componentDidMount(){
        const {taxRefs, closeRefs, allScoresRefs} = this.props;
        const {loading} = this.state;
        loading && setTimeout(() => {
            // console.log('upload finished.....');
            this.setState({
                loading: false
            });
        }, 8000)
        if(Object.keys(taxImgs).length === 0){
            Object.keys(taxRefs).forEach((key, index, arr) => {
                this.convertDivToImg('tax', key, taxRefs[key]);
            })
        }
        if(Object.keys(closeImgs).length === 0){
            Object.keys(closeRefs).forEach((key, index, arr) => {
                this.convertChart(close_WIDTH, close_HEIGHT, key, closeRefs[key]);
            })
        }
        if(Object.keys(allScoresImgs).length === 0){
            Object.keys(allScoresRefs).forEach((key, index, arr) => {
                this.convertDivToImg('all', key, allScoresRefs[key]);
            })
        }
    }
        
    handleShowResultPDF = () => {
        this.setState({ showResultPDF: true });
    }
    
    handleCloseResultPDF = () => {
        this.setState({ showResultPDF: false });
    }

    convertChart = (width, height, key, ref) => {
        if(ref){
            let svg = ReactDOM.findDOMNode(ref);
            svgToPng(svg, width, height)
                .then(imgData => {
                    closeImgs = {
                        ...closeImgs,
                        [key]: imgData
                    }
                })
                .catch(() => {
                    return;
                });
        }
    }

    convertDivToImg = async (event, key, ref) => {
        await html2canvas(event === 'tax' ? ref.container : ref, {
            removeContainer: false
        })
        .then(canvas => {
            let base64image = canvas.toDataURL("image/png");
            switch(event){
                case 'tax':
                    taxImgs = {
                        ...taxImgs,
                        [key]: base64image
                    }
                    break;
                default:
                    allScoresImgs = {
                        ...allScoresImgs,
                        [key]: base64image
                    }
                    break;
            }
        })
        .catch(err => {
            // console.log(err);
            return;
        })
    }

    render() {
        const {showResultPDF, loading} = this.state;
        const {activeKit, user, microTestResult, taxonomicResult, closeProfiles, allScores} = this.props;
        return (
            <Fragment>
                <button onClick={this.handleShowResultPDF} className='pdf-btn'>
                    MİKROBİYOM ANALİZİ RAPORU GÖSTER
                </button>
                {loading ? 
                    <div className='loading'>
                        <div className='loading-logo'></div>
                    </div> : 
                    showResultPDF && 
                    <div onClick={this.handleCloseResultPDF} className='report-modal-overlay'>
                        <PDFViewer style={styles.pdfViewer}>
                            <ResultDoc
                                activeKit={activeKit}
                                user={user}
                                microTestResult={microTestResult}
                                taxonomicResult={taxonomicResult}
                                taxImgs={taxImgs}
                                closeProfiles={closeProfiles}
                                closeImgs={closeImgs}
                                allScores={allScores}
                                allScoresImgs={allScoresImgs}
                            />
                        </PDFViewer>
                    </div>
                }
            </Fragment>
        )
    }
}

// Create styles
const styles = StyleSheet.create({
    pdfViewer: {
        position: 'relative',
        height: '90%',
        width: '80%',
        top: '5%',
        left: '10%',
        borderRadius: 15
    }
});

export default ResultPDFReport;