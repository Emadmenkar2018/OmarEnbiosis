import React, { Component } from 'react'
import './ImportantMicroItem.css'
import {Collapse, Card} from 'react-bootstrap'
// import MicroExampleList from '../../MicroExampleList/MicroExampleList'
import withWindowDimensions from '../../../../hoc/withWindowDimensions'

// const microExamples = [
//     {
//         imageUrl: 'egg.png',
//         exampleTitle: 'Yumurta',
//         altTitle: 'yumurta'
//     },
//     {
//         imageUrl: 'meat.png',
//         exampleTitle: 'Kırmızı Et',
//         altTitle: 'kırmızı-et'
//     },
//     {
//         imageUrl: 'strawberry.png',
//         exampleTitle: 'Çilek',
//         altTitle: 'çilek'
//     },
//     {
//         imageUrl: 'mushroom.png',
//         exampleTitle: 'Mantar',
//         altTitle: 'mantar'
//     },
//     {
//         imageUrl: 'fish.png',
//         exampleTitle: 'balık',
//         altTitle: 'mantar'
//     },
//     {
//         imageUrl: 'carrot.png',
//         exampleTitle: 'Havuç',
//         altTitle: 'balık'
//     }
// ]

class ImportantMicroItem extends Component {
    state = {
        isOpen: false
    }

    handleCollapse = (e) => {
        e.preventDefault();
        const {isOpen} = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }

    render() {
        const {isOpen} = this.state;
        const {title, desc, scores} = this.props.micro;
        const {windowWidth} = this.props;
        const scoreList = scores.map((sc, index) => {
            let leftPostition = null
            if(windowWidth >= 1700){
                leftPostition = +sc.value === 0 ? 1 : +sc.value === 100 ? 99 : sc.value;
            }else if(windowWidth < 1700 && windowWidth > 1250){
                leftPostition = +sc.value < 3 ? 3 : +sc.value > 97 ? 97 : sc.value;
            }else if(windowWidth < 1250 && windowWidth > 750){
                leftPostition = +sc.value < 4 ? 4 : +sc.value > 96 ? 96 : sc.value;
            }else if(windowWidth < 750 && windowWidth > 615){
                leftPostition = +sc.value < 6 ? 6 : +sc.value > 94 ? 94 : sc.value;
            }else {
                leftPostition = +sc.value < 12 ? 12 : +sc.value > 88 ? 88 : sc.value;
            }
            return (
                <div key={index} className='micro-status-wrapper'>
                    {sc.isMy ? 
                        <div className='sample-micro-status' style={{left: `calc(${leftPostition}% - 60px)`, top: -125}}>
                            {sc.title.split(' ').map((t, index) => 
                                <div key={index}>{t}</div>
                            )}
                            <strong>{sc.value}</strong>
                            <div className='my-status-icon'></div>
                        </div> : 
                        <div className='sample-micro-status' style={{left: `calc(${leftPostition}% - 60px)`}}>
                            <div className='status-icon'></div>
                            <div>
                                {sc.title}
                            </div>
                            <strong>{sc.value}</strong>
                        </div>
                    }
                </div>
            )
        });
        return (
            <Card>
                <Card.Header>
                    <button onClick={this.handleCollapse} className='collapse-btn' type="button" data-toggle="collapse" data-target={`#${title}-collapse`} aria-expanded="false" aria-controls={`${title}-collapse`}>
                        <strong>{title}</strong>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="24" height="24"
                            viewBox="0 0 172 172"
                            className={`arrow-icon ${isOpen && 'active-arrow-icon'}`}
                            id='arrow-icon'
                        >
                            <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" >
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#565d68">
                                    <path d="M154.8,103.2v11.46667c0,2.21307 -1.27853,4.2312 -3.27947,5.18293c-2.00093,0.95173 -4.3688,0.65933 -6.0888,-0.74533l-59.43173,-48.63013l-59.43747,48.63013c-1.71427,1.40467 -4.08213,1.69133 -6.0888,0.74533c-2.00667,-0.946 -3.27373,-2.96987 -3.27373,-5.18293v-11.46667c0,-1.72 0.774,-3.34827 2.10413,-4.4376l63.06667,-51.6c2.1156,-1.72573 5.14853,-1.72573 7.26413,0l63.06667,51.6c1.3244,1.08933 2.0984,2.7176 2.0984,4.4376z"></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </Card.Header>
                <Collapse in={isOpen}>
                    <div id={`${title}-collapse`}>
                        <Card.Body className='micro-body'>
                            <div className='micro-desc'>
                                {desc.map((d, index) => 
                                    <p key={index}>
                                        {d}.
                                    </p>
                                )}
                            </div>
                            <div className='micro-age-wrapper'>
                                <div className='micro-age'>
                                    {scoreList}
                                </div>
                            </div>
                            {/* <MicroExampleList
                                microExamples={microExamples}
                            /> */}
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>
        )
    }
}

export default withWindowDimensions(ImportantMicroItem);