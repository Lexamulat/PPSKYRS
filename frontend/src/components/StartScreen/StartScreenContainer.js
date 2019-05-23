import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import StartScreen from './StartScreen';

import {test, register, login, logout} from '../../reducers/auth/authActions';

const mapStateToProps = (state) => {
    return {
        ...state.auth
    };

};

const mapDispatchToProps = {
    onTest: test,
    onRegister: register,
    onLogin: login,
    onLogOut: logout,
    onNavigate: push
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartScreen);