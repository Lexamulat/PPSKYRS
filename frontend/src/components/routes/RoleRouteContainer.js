import {connect} from 'react-redux';
import {push} from 'connected-react-router'

import RoleRoute from './RoleRoute';


const mapStateToProps = state => {

    return {
        ...state.auth
    };
};

const mapDispatchToProps = {
    onNavigate: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleRoute);