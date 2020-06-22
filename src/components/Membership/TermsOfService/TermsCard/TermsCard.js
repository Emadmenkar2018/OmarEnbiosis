import React from 'react'
import './TermsCard.css'
import {Accordion, Card} from 'react-bootstrap'
import {Scrollbars} from 'react-custom-scrollbars'
import CustomToggle from '../CustomToggle/CustomToggle'

const TermsCard = ({activeKey, index, termId, title, onCollapse, children}) => {
    return (
        <Card className='terms-card'>
            <Card.Header id={`${termId}-heading`}>
                <CustomToggle
                    title={title}
                    eventKey={index}
                    activeKey={activeKey}
                    onCollapse={onCollapse}
                />
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
                <Scrollbars 
                    style={{height: 200}}
                    renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                    renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                >
                    <div id={`${termId}-collapse`}>
                        <Card.Body className='terms-body'>
                            {children}
                        </Card.Body>
                    </div>
                </Scrollbars>
            </Accordion.Collapse>
        </Card>
    )
}

export default TermsCard;