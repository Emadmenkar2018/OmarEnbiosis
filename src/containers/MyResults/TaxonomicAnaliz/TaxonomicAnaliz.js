import React, { Component, Fragment } from 'react'
import './TaxonomicAnaliz.css'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import ChartsWrapper from '../../../components/MyResults/ChartsWrapper/ChartsWrapper'
import {setActiveSideItem} from '../../../store/actions/general'
import {handleGetTaxonomicResult} from '../../../store/actions/myResults'

class TaxonomicAnaliz extends Component {
    state = {
        loading: this.props.taxonomicResult.length === 0,
        errMessage: ''
    }

    componentDidMount(){
        const {setActiveSideItem, currentUser, taxonomicResult, handleGetTaxonomicResult} = this.props;
        
        setActiveSideItem('result');

        if(taxonomicResult.length === 0){
            const kitCode = currentUser.activeKit.kit_code;
            handleGetTaxonomicResult(kitCode)
                .then(() => {
                    return this.setState({
                        loading: false,
                        errMessage: ''
                    })
                })
                .catch((err) => {
                    return this.setState({
                        loading: false,
                        errMessage: err.kit_code
                    })
                })
        }
    }

    componentDidUpdate(prevProps){
        const {activeLanguage, currentUser, handleGetTaxonomicResult} = this.props;
        const kitCode = currentUser.activeKit.kit_code;

        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            handleGetTaxonomicResult(kitCode)
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
        const {loading} = this.state;
        const {taxonomicResult} = this.props;
        let taxonomicList = null;
        if(taxonomicResult.lenght !== 0){
            taxonomicList = taxonomicResult.map((tax, index) => 
                <div key={index} className='main-card'>
                    <div className='details-head'>
                        <div className='head-text'>
                            <small>
                                {translate('tax-smallText')}
                            </small>
                            <hr/>
                            <div className='head-title'>
                                {tax.title}
                            </div>
                        </div>
                    </div>
                    <div className='taks-desc'>
                        {tax.desc}
                    </div>
                    <ChartsWrapper
                        chartItems={tax.items}
                    />
                </div>
            );
        }
        return (
            <Fragment>
                {loading ? 
                    <div className='loading'>
                        <div className='loading-logo'></div>
                    </div> : 
                    taxonomicList
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
        taxonomicResult: state.myResults.taxonomicResult
    }
}

export default connect(mapStateToProps, {setActiveSideItem, handleGetTaxonomicResult})(TaxonomicAnaliz);