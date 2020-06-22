import React from 'react'
import './TrackStatus.css'

const TrackStatus = ({title, date}) => {
    return (
        <div className='track-status'>
            {date !== null && 
                <div className='success-icon'></div>
            }
            <div className='track-title' style={{marginLeft: date === null ? 35 : 0}}>
                <strong>{title}</strong>
                <div className='track-date'>{date === null ? '-' : date}</div>
            </div>
        </div>
    )
}

export default TrackStatus;