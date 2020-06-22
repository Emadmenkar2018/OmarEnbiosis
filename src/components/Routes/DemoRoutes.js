import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import HomeDemo from '../../containers/DemoPages/HomeDemo/HomeDemo'
import MyDemoFoods from '../../containers/DemoPages/MyDemoFoods/MyDemoFoods'

const DemoRoutes = () => {
    return (
        <Switch>
            <Route
                exact path='/demo/home/:lang'
                render={(props) => 
                    <HomeDemo
                        lang={props.match.params.lang}
                    />
                }
            />

            <Route
                exact path='/demo/foods/:lang'
                render={(props) => 
                    <MyDemoFoods
                        lang={props.match.params.lang}
                    />
                }
            />
        </Switch>
    )
}

export default withRouter(DemoRoutes);