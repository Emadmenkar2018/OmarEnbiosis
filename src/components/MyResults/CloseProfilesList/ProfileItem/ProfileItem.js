import React from 'react'
import './ProfileItem.css'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from '../../ProgressProvider/ProgressProvider'

const ProfileItem = ({profile, isHome}) => {
    return (
        <div className={`profile ${isHome ? 'home-close-profiles' : ''}`}>
            <div className='profile-title'>
                {profile.title}
            </div>
            <ProgressProvider valueStart={0} valueEnd={profile.value}>
                {value => 
                    <CircularProgressbar
                        value={value}
                        text={`%${value}`}
                        styles={{
                            path: {
                                stroke: '#fe7a6e',
                                strokeLinecap: "butt"
                            },
                            trail: {
                                stroke: '#eef1f5',
                                strokeWidth: '2px'
                            },
                            text: {
                                fill: '#a5a7ac',
                                fontWeight: 'bold'
                            }
                        }}
                        strokeWidth={15}
                    />
                }
            </ProgressProvider>
        </div>
    )
}

export default ProfileItem;