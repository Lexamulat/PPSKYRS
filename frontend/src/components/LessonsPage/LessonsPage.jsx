import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import {
    Button, ShowResultDialog
} from 'components/controls';


import LessonItem from './LessonItem/LessonItem';

import styles from './LessonsPage.scss';


export default class LessonsPage extends React.Component {

    static propTypes = {

        onNavigate: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired,


        // onCheckResetPasswordToken: PropTypes.func.isRequired,

        // checkResetPassToken: PropTypes.object,
        // checkResetPassTokenError: PropTypes.object,
        // checkResetPassTokenProcessing: PropTypes.bool,

        onGetLessons: PropTypes.func.isRequired,

        getLessons: PropTypes.array,
        getLessonsError: PropTypes.object,
        getLessonsProcessing: PropTypes.bool,


        onCreateLesson: PropTypes.func.isRequired,

    };

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            isCreateDialogVisible: false
        };
    }


    componentWillMount() {
        this.props.onGetLessons();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.getLessons && nextProps.getLessons) {
            this.writeInfoToState(nextProps.getLessons)
        }
    }

    writeInfoToState(lessons) {
        this.setState({ lessons })
    }

    signAction = (isLogged) => () => {

        if (isLogged) {
            this.props.onLogout();
        }

    }

    renderSignBtn = () => {
        const { login } = this.props;
        const isLogged = Boolean(login && Boolean(login.role));

        return (
            <div className={styles.signBtn} onClick={this.signAction(isLogged)}>
                <Button
                    text={isLogged ? loc('sign-out') : loc('sign-in')}
                />
            </div>
        )
    }

    renderPoints = () => {
        const mas = [];
        const { login } = this.props;
        const { id } = login

        const { lessons } = this.state;

        return (
            <Fragment>
                {lessons.map((el, i) => {
                    return (
                        <LessonItem
                            key={i}
                            showEditBtns={id == el.userId}
                            {...el}
                        />

                    )
                })}
            </Fragment>

        )
    }

    toggleCreateLessonDialog = () => {
        const { isCreateDialogVisible } = this.state;
        this.setState({ isCreateDialogVisible: !isCreateDialogVisible })
    }

    sendCreateLesson = (name, lessonType, year, location, description) => {
        this.props.onCreateLesson(name, lessonType, year, location, description);
        // this.toggleCreateLessonDialog();
    }

    renderCreateReportDialog = () => {
        const { isCreateDialogVisible } = this.state;
        if (!isCreateDialogVisible) return;

        return (
            <ShowResultDialog
                title={'Create lesson'}
                onClose={this.toggleCreateLessonDialog}
                onAction={this.toggleCreateLessonDialog}
                submitAction={this.sendCreateLesson}
                toggleCreateAction={this.toggleCreateLessonDialog}
            />
        )
    }

    render() {

        const createClass = className(styles.btnWrapper, styles.create)

        return (
            <div className={styles.page}>
                {this.renderCreateReportDialog()}
                <div className={styles.logoLine}>
                    <div className={styles.logo} onClick={() => { this.props.onNavigate('/') }}>StateExam</div>
                    <div className={styles.topLineButtonsBlock}>
                        {this.renderSignBtn()}
                    </div>
                </div>
                <section className={styles.pageContent}>
                    <section className={styles.contentColumn}>
                        {this.renderPoints()}
                    </section>
                    <div
                        className={createClass}
                        onClick={this.toggleCreateLessonDialog}
                    >Create</div>
                </section>
            </div>
        )
    }
}
