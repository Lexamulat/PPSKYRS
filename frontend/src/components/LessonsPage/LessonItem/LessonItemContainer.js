import { connect } from 'react-redux';
import { push } from 'connected-react-router';


import { getLessonById,editLessonById } from '../../../reducers/auth/authActions';


import LessonItem from './LessonItem';


const mapStateToProps = (state) => {
    return {
        ...state.auth
    };

};

const mapDispatchToProps = {
    onGetLessonById: getLessonById,
    onEditLessonById:editLessonById
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonItem);