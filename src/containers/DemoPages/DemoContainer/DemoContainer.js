import React, { Fragment } from 'react'
import DemoRoutes from '../../../components/Routes/DemoRoutes'

const DemoContainer = () => {
    return (
        <Fragment>
            <div className='u-background'></div>
            <div className='main-content' style={{marginLeft: 0}}>
                <DemoRoutes/>
            </div>
        </Fragment>
    )
}

export default DemoContainer;