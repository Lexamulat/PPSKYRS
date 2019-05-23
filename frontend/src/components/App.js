import React, {Component} from 'react';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import DefineUserRole from './routes/DefineUserRoleContainer'

import Router from './routes/Router';

export default class App extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        const {store} = this.props;

        return (
            <Provider store={store}>
                <DefineUserRole>
                    <Router/>
                </DefineUserRole>
            </Provider>
        );
    }
}
