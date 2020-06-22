import React, { Component, Fragment } from 'react'
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import FoodDoc from './FoodDoc/FoodDoc'

class FoodPDFReport extends Component {
    state = {
        showFoodPDF: false
    }

    handleShowFoodPDF = () => {
        this.setState({ showFoodPDF: true });
    }
    
    handleCloseFoodPDF = () => {
        this.setState({ showFoodPDF: false });
    }

    render() {
        const {showFoodPDF} = this.state;
        const {activeKit, user, foodList} = this.props;
        return (
            <Fragment>
                <button onClick={this.handleShowFoodPDF} className='pdf-btn'>
                    BESİN SKORLARI RAPORU GÖSTER
                </button>
                {showFoodPDF && 
                    <div onClick={this.handleCloseFoodPDF} className='report-modal-overlay'>
                        <PDFViewer style={styles.pdfViewer}>
                            <FoodDoc
                                activeKit={activeKit}
                                user={user}
                                foodList={foodList}
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

export default FoodPDFReport;