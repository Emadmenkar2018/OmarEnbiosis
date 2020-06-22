import React from 'react'
import './CloseProfilesList.css'
import ProfileItem from './ProfileItem/ProfileItem'

const CloseProfilesList = ({closeProfiles}) => {
    const profileList = closeProfiles.map((profile, index) => 
        <ProfileItem
            key={index}
            profile={profile}
        />
    );
    return (
        <div className='profiles-wrapper'>
            {profileList}
        </div>
    )
}

export default CloseProfilesList;