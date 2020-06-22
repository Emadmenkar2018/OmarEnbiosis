import React from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Surveys from '../MyAccount/Surveys/Surveys'
import SurveySection from '../MyAccount/Surveys/SurveySection/SurveySection'
import SurveyWarning from '../MyAccount/Surveys/SurveyWarning/SurveyWarning'
import MySample from '../../containers/MyResults/MySample/MySample'

const NonActiveKitRoutes = () => {
    return (
        <Switch>
            <Route
                exact path='/account/survey/warning'
                render={(props) => 
                    <SurveyWarning
                        {...props}
                    />
                }
            />
            <Route
                exact path='/account/survey'
                render={(props) => 
                    <Surveys
                        {...props}
                    />
                }
            />
            <Route
                path='/account/survey/:section'
                render={(props) => {
                    return <SurveySection
                        {...props}
                        {...props.location.state}
                    />
                }}
            />

            <Route
                exact path='/results/mySample'
                render={() => (
                    <MySample/>
                )}
            />

            <Route
                path='/'
                render={() => (
                    <Redirect to='/account/survey/warning'/>
                )}
            />
        </Switch>
    )
}

export default withRouter(NonActiveKitRoutes);