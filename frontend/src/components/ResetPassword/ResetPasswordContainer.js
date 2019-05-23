import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import ResetPassword from './ResetPassword';

import {setPassword, checkResetPasswordToken} from '../../reducers/auth/authActions';

const mapStateToProps = (state) => {
    return {
        ...state.auth
    };

};

const mapDispatchToProps = {
    onNavigate: push,
    onCheckResetPasswordToken: checkResetPasswordToken,
    onSetPassword: setPassword
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);