import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import MembershipRegister from '../../containers/MembershipRegister/MembershipRegister';
import MainContainer from '../../containers/MainContainer/MainContainer'

const Sub = () => {
    return (
        <Switch>
            <Route
                exact path='/register'
                render={props => (
                    <MembershipRegister
                        {...props}
                    />
                )}
            />
            <Route
                path='/'
                render={props => (
                    <MainContainer
                        {...props}
                    />
                )}
            />
        </Switch>
    )
}

export default withRouter(Sub);