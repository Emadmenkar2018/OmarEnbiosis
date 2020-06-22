import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import EmailVerificationPage from '../../containers/EmailVerificationPage/EmailVerificationPage'

const VerifyRoutes = () => {
    return (
        <Switch>
            <Route
                exact path='/verify-email'
                render={props => (
                    <EmailVerificationPage
                        {...props}
                    />
                )}
            />
            <Route
                path='/'
                render={() => (
                    <Redirect to='/verify-email'/>
                )}
            />
        </Switch>
    )
}

export default withRouter(VerifyRoutes);