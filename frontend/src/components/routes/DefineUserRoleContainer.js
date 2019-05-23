import {connect} from 'react-redux';

import {push} from 'connected-react-router';
import {getUserRole} from 'reducers/auth/authActions';


import DefineUserRole from './DefineUserRole';

const mapStateToProps = state => {
    return {
        login: state.auth.login,
        authLoaded: state.auth.authLoaded,
        loadedFromToken: state.auth.loadedFromToken,
        logoutSuccess: state.auth.logoutSuccess,
    };
};

const mapDispatchToProps = {
    onGetUserRole: getUserRole,
    onNavigate: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(DefineUserRole);