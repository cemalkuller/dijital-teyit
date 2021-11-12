import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect ,Provider } from 'react-redux';
import 'react-whatsapp-widget/dist/index.css'
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { HomePage } from '../HomePage';
import  {Teyit}  from '../Teyit';
import {Evrak}  from '../Evrak';

import { userService } from '../_services/user.service';
import ReactNotifications from 'react-notifications-component';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
 
         }

    render() {
        const { alert } = this.props;
        return (

            <Router history={history}>
                   
                   <ReactNotifications />
              
              
                <Switch>
               
                    <Route exact path="/teyit/:token" component={Teyit} />
                    <Route exact path="/evrak/:token" component={Evrak} />
                    <Route path="/" component={HomePage} />     
                </Switch>
            </Router>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };