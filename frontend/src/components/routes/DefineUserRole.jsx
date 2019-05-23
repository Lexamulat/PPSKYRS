import React, {Component as ReactComponent} from 'react';
import PropTypes from 'prop-types';


export default class DefineUserRole extends ReactComponent {
    static propTypes = {
        onNavigate: PropTypes.func.isRequired,
        onGetUserRole: PropTypes.func.isRequired,
        authLoaded: PropTypes.bool,
        login: PropTypes.any
    };

    componentWillMount() {
        this.props.onGetUserRole();
    }

    componentWillReceiveProps(nextProps) {

        if (!this.props.connected && nextProps.connected && !this.props.authLoaded) {
            return this.props.onGetUserRole();
        }

        if (this.props.authLoaded && !nextProps.authLoaded) {
            return this.props.onGetUserRole();
        }


        if (this.props.login && !nextProps.login && nextProps.logoutSuccess) {
            this.props.onNavigate('/');
        }

    }

    handleRender() {
        const {children, authLoaded} = this.props;

        if (authLoaded) {
            return <div>{children}</div>
        }

    }


    render() {
        return (
            <div>{this.handleRender()}</div>
        )
    }
}
