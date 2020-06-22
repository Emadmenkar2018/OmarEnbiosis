import React from 'react'
import './MicroExampleList.css'
import MicroExampleItem from './MicroExampleItem/MicroExampleItem'

const MicroExampleList = ({microExamples}) => {
    const microExampleList = microExamples.map((example, index) => 
        <MicroExampleItem
            key={index}
            imageUrl={example.imageUrl}
            exampleTitle={example.exampleTitle}
            altTitle={example.altTitle}
        />    
    )
    return (
        <div className='micro-examples'>
            {microExampleList}
        </div>
    )
}

export default MicroExampleList;