import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import SignIn from './SignIn';

import {login, logout} from '../../reducers/auth/authActions';

const mapStateToProps = (state) => {
    return {
        ...state.auth

    };

};

const mapDispatchToProps = {
    onNavigate: push,
    onLogin: login
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);