import React from 'react'
import {Switch, Route, withRouter } from 'react-router-dom'
import LoginPage from '../../containers/LoginPage/LoginPage'
import MembershipRegister from '../../containers/MembershipRegister/MembershipRegister'
import DemoContainer from '../../containers/DemoPages/DemoContainer/DemoContainer'

const Main = () => {
    return (
        <Switch>
            <Route
                exact path='/register'
                render={props => 
                    <MembershipRegister
                        {...props}
                    />
                }
            />

            {/****************** demo routes *******************/}
            <Route
                exact path='/demo/home/:lang'
                render={props => 
                    <DemoContainer
                        {...props}
                    />
                }
            />
            <Route
                exact path='/demo/foods/:lang'
                render={props => 
                    <DemoContainer
                        {...props}
                    />
                }
            />

            <Route
                path='/'
                render={props => 
                    <LoginPage
                        {...props}
                    />
                }
            />
        </Switch>
    )
}

export default withRouter(Main);