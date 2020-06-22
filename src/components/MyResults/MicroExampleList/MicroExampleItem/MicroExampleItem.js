import React, { Component } from 'react'
import './MicroExampleItem.css'

export default class MicroExampleItem extends Component {
    example_image = require(`../../../../static/images/Food-Images/${this.props.imageUrl}`);

    render() {
        const {exampleTitle, altTitle} = this.props;
        return (
            <div className='micro-example'>
                <div className='example-image-container'>
                    <img className='example-image' src={this.example_image} alt={altTitle}/>
                </div>
                <div className='example-title'>{exampleTitle}</div>
            </div>
        )
    }
}
