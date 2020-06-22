import React from 'react'
import './CloseProfileCard.css'
import CloseProfilesList from '../../MyResults/CloseProfilesList/CloseProfilesList'

const CloseProfileCard = ({translate, closeProfiles, errMessage}) => {
    return (
        <div className='main-card' style={{padding: '20px 15px 5px'}}>
            <div className='close-title'>
                {translate('cP-main-title')}
            </div>
            {errMessage !== '' ? 
                <div className='err-container' style={{margin: '20px 0'}}>
                    {errMessage}
                </div> : 
                <CloseProfilesList
                    closeProfiles={closeProfiles.slice(0, 6)}
                />
            }
        </div>
    )
}

export default CloseProfileCard;