import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import SignUp from './SignUp';

import {register, resendRegisterLink, checkConfirmationToken} from '../../reducers/auth/authActions';

const mapStateToProps = (state) => {
    return {
        ...state.auth
    };

};

const mapDispatchToProps = {
    onNavigate: push,
    onRegister: register,
    onResendRegisterLink: resendRegisterLink,
    onCheckConfirmationToken: checkConfirmationToken
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);