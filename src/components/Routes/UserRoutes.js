import React from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import HomePage from '../../containers/HomePage/HomePage'
import IntroToRecommendations from '../../containers/MyFoods/IntroToRecommendations/IntroToRecommendations'
import MyFoods from '../../containers/MyFoods/MyFoods'
import ImportantMicrobiome from '../../containers/MyResults/ImportantMicrobiome/ImportantMicrobiome'
import AllMyScores from '../../containers/MyResults/AllMyScores/AllMyScores'
import TaxonomicAnaliz from '../../containers/MyResults/TaxonomicAnaliz/TaxonomicAnaliz'
import ScoreDetails from '../MyResults/ScoreDetails/ScoreDetails'
import CloseProfiles from '../../containers/MyResults/CloseProfiles/CloseProfiles'
import MySample from '../../containers/MyResults/MySample/MySample'
import MyAccount from '../../containers/MyAccount/MyAccount'
import AccountSettings from '../MyAccount/AccountSettings/AccountSettings.js'
import SampleTracking from '../../containers/MyAccount/SampleTracking/SampleTracking'
import Surveys from '../MyAccount/Surveys/Surveys'
import SurveySection from '../MyAccount/Surveys/SurveySection/SurveySection'
import MyResources from '../../containers/MyResources/MyResources'

const UserRoutes = () => {
    return (
        <Switch>
            <Route
                exact path='/home'
                render={() => (
                    <HomePage/>
                )}
            />

            <Route
                exact path='/foods/intro'
                render={() => (
                    <IntroToRecommendations/>
                )}
            />
            <Route
                exact path='/foods'
                render={() => (
                    <MyFoods/>
                )}
            />

            <Route
                exact path='/results/important-microbiome'
                render={() => (
                    <ImportantMicrobiome/>
                )}
            />
            <Route
                exact path='/results/scores'
                render={props => (
                    <AllMyScores
                        {...props}
                    />
                )}
            />
            <Route
                exact path='/results/taxonomic'
                render={props => (
                    <TaxonomicAnaliz
                        {...props}
                    />
                )}
            />
            <Route
                path='/results/scores/:scoreName'
                render={props => (
                    <ScoreDetails
                        {...props}
                        {...props.location.state}
                    />
                )}
            />
            <Route
                exact path='/results/close-profiles'
                render={props => (
                    <CloseProfiles
                        {...props}
                    />
                )}
            />
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
                    <Redirect to='/home'/>
                )}
            />
        </Switch>
    )
}

export default withRouter(UserRoutes);