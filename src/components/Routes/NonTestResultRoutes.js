import React from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import MySample from '../../containers/MyResults/MySample/MySample'
import MyAccount from '../../containers/MyAccount/MyAccount'
import AccountSettings from '../MyAccount/AccountSettings/AccountSettings.js'
import SampleTracking from '../../containers/MyAccount/SampleTracking/SampleTracking'
import Surveys from '../MyAccount/Surveys/Surveys'
import SurveySection from '../MyAccount/Surveys/SurveySection/SurveySection'
import MyResources from '../../containers/MyResources/MyResources'

const NonTestResultRoutes = () => {
    return (
        <Switch>
            <Route
                exact path='/results/mySample'
                render={() => (
                    <MySample/>
                )}
            />
            <Route
                exact path='/account'
                render={(props) => 
                    <MyAccount
                        {...props}
                    />
                }
            />
            <Route 
                path='/account/order-kit' 
                component={() => { 
                    window.open('http://enbiosis.com/checkout');
                    return <Redirect to='/account'/>;
                }}
            />
            <Route
                exact path='/settings'
                render={(props) => 
                    <AccountSettings
                        {...props}
                    />
                }
            />
            <Route
                exact path='/account/sample-tracking'
                render={props => 
                    <SampleTracking
                        {...props}
                    />
                }
            />
            <Route
                exact path='/account/survey'
                render={props => 
                    <Surveys
                        {...props}
                    />
                }
            />
            <Route
                path='/account/survey/:section'
                render={props => 
                    <SurveySection
                        {...props}
                        {...props.location.state}
                    />
                }
            />

            <Route
                exact path='/resources'
                render={props => 
                    <MyResources
                        {...props}
                    />
                }
            />

            <Route
                path='/'
                render={() => (
                    <Redirect to='/account'/>
                )}
            />
        </Switch>
    )  
}

export default withRouter(NonTestResultRoutes);