import React from 'react'
import './ScoresList.css'
import ScoreChip from './ScoreChip/ScoreChip'

const ScoresList = ({scIndex, analizeType, items, handleScoreClick}) => {
    let scoresList = items.map((score, index) => 
        <ScoreChip
            key={index}
            scIndex={scIndex}
            type={analizeType}
            index={index}
            head={score.head}
            slug={score.slug}
            scoreClick={handleScoreClick}
        />
    );
    return (
        <div className='score-content'>
            {scoresList}
        </div>
    )
}

export default ScoresList;