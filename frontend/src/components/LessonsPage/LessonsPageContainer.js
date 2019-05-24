import {connect} from 'react-redux';
import {push} from 'connected-react-router';


import {logout} from '../../reducers/auth/authActions';


import LessonsPage from './LessonsPage';


const mapStateToProps = (state) => {
    return {
        ...state.auth
    };

};

const mapDispatchToProps = {
    onLogout: logout,
    onNavigate: push
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonsPage);