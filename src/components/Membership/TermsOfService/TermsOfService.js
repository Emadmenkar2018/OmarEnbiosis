import React, { Component, Fragment } from 'react'
import './TermsOfService.css'
import {Accordion} from 'react-bootstrap'
import TermsCard from './TermsCard/TermsCard'
import UyelikSozlesmesi from './TermsDocs/UyelikSozlesmesi'
import GizlilikPolitikasi from './TermsDocs/GizlilikPolitikasi'
import OnBilgilendirmeFormu from './TermsDocs/OnBilgilendirmeFormu'
import AydinlatmaFormu from './TermsDocs/AydinlatmaFormu'

class TermsOfService extends Component {
    state = {
        activeKey: "0"
    }

    handleAccordionCollapse = (activeKey) => {
        this.setState({
            activeKey
        });
    };

    render(){
        const {translate, handleSubmit} = this.props;
        const {activeKey} = this.state;
        return (
            <Fragment>
                <Accordion activeKey={activeKey}>
                    <TermsCard
                        activeKey={activeKey}
                        index="0"
                        isOpen={true}
                        termId='Üyelik'
                        title='Üyelik Sözleşmesi'
                        onCollapse={this.handleAccordionCollapse}
                    >
                        <UyelikSozlesmesi/>
                    </TermsCard>
                    <TermsCard
                        activeKey={activeKey}
                        index="1"
                        isOpen={false}
                        termId='Gizlilik'
                        title='Gizlilik Politikası'
                        onCollapse={this.handleAccordionCollapse}
                    >
                        <GizlilikPolitikasi/>
                    </TermsCard>
                    <TermsCard
                        activeKey={activeKey}
                        index="2"
                        isOpen={false}
                        termId='Bilgilendirme'
                        title='Ön Bilgilendirme Formu'
                        onCollapse={this.handleAccordionCollapse}
                    >
                        <OnBilgilendirmeFormu/>
                    </TermsCard>
                    <TermsCard
                        activeKey={activeKey}
                        index="3"
                        isOpen={false}
                        termId='Aydınlatma'
                        title='Aydınlatma formu'
                        onCollapse={this.handleAccordionCollapse}
                    >
                        <AydinlatmaFormu/>
                    </TermsCard>
                </Accordion>
                <form className='user-form' onSubmit={handleSubmit}>
                    <div className='checkbox-wrapper'>
                        <label className='checkbox-container'>
                            <input
                                type='checkbox'
                                name='terms-checkbox'
                                required
                            />
                            <span className='checkbox-checkmark'></span>
                            {translate('term-checkbox')}
                        </label>
                    </div>
                    <button className='n-btn'>
                        {translate('create-btn')}
                    </button>
                </form>
            </Fragment>
        )
    }
}

export default TermsOfService;