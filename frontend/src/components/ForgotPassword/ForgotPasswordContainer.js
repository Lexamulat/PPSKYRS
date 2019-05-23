import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import ForgotPassword from './ForgotPassword';

import {forgotPassword} from '../../reducers/auth/authActions';

const mapStateToProps = (state) => {
    return {
        ...state.auth

    };

};

const mapDispatchToProps = {
    onNavigate: push,
    onForgotPassword: forgotPassword
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);