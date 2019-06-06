import { connect } from 'react-redux';
import { push } from 'connected-react-router';


import { logout, getLessons, createLesson } from '../../reducers/auth/authActions';


import LessonsPage from './LessonsPage';


const mapStateToProps = (state) => {
    return {
        ...state.auth
    };

};

const mapDispatchToProps = {
    onLogout: logout,
    onNavigate: push,
    onGetLessons: getLessons,
    onCreateLesson: createLesson
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonsPage);