import React, { Component } from 'react'
import './ScoreKeys.css'
import { Collapse } from 'react-bootstrap';

class ScoreKeys extends Component {
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

    render(){
        const {isOpen} = this.state;
        const {translate, scoreKeys} = this.props;
        let keysList = null;
        if(scoreKeys){
            keysList = scoreKeys.keys.map((key, index) => 
                <div key={index} className={`${index === 1 ? 'mid' : ''}`}>
                    <div className='content-title'>{key.title}</div>
                    <div className='content-desc'>
                        {key.desc}
                    </div>
                </div>
            )

        }
        return (
            <button className='score-key-btn' type="button" data-toggle="collapse" data-target={`#score-key-collapse`} aria-expanded="false" aria-controls={`score-key-collapse`}>
                <strong className='score-key-title'>{translate('aS-score-key')}</strong>
                <Collapse in={isOpen}>
                    <div className='score-key-container' id={`score-key-collapse`}>
                        <div>
                            <div className='score-key-content'>
                                <div className='score-key-content-title'>
                                    {scoreKeys && scoreKeys.title}
                                </div>
                                {keysList !== null && keysList}
                            </div>
                        </div>
                        <div className='score-key-desc'>
                            {scoreKeys && scoreKeys.desc}
                        </div>
                    </div>
                </Collapse>
            </button>
        )
    }
}

export default ScoreKeys;