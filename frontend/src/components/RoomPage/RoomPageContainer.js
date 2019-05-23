import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import RoomPage from './RoomPage';


const mapStateToProps = (state) => {
    return {};

};

const mapDispatchToProps = {
    onNavigate: push
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomPage);