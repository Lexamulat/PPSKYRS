import {connect} from 'react-redux';
import {push} from 'connected-react-router';


import {logout, test} from '../../reducers/auth/authActions';


import TeacherLending from './TeacherLending';


const mapStateToProps = (state) => {
    return {
        ...state.auth
    };

};

const mapDispatchToProps = {
    onNavigate: push,
    onLogout: logout,
    onTest: test

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeacherLending);