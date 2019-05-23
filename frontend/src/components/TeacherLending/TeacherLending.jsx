import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    Button
} from 'components/controls';


import styles from './TeacherLending.scss';


export default class TeacherLending extends React.Component {

    static propTypes = {
        onNavigate: PropTypes.func.isRequired,
    };

    goToSignUp = () => {
        this.props.onNavigate('/signup')
    }

    signAction = (isLogged) => () => {

        if (isLogged) {
            this.props.onLogout();
        } else {
            this.props.onNavigate('/login');
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

    testPermition = () => {
        this.props.onTest();
    }

    goToLessonsPage = () => {
        this.props.onNavigate('/lessons')
    }


    render() {
        const fLine = classNames(styles.line, styles.cursiveLine);
        const sLine = classNames(styles.line, styles.sLine);

        const question1Class = classNames(styles.questionSVG, styles.question1);
        const question2Class = classNames(styles.questionSVG, styles.question2);
        const question3Class = classNames(styles.questionSVG, styles.question3);
        const question4Class = classNames(styles.questionSVG, styles.question4);


        return (
            <div className={styles.wrapper}>
                <div className={styles.fakeHeaderGrad}></div>
                <div className={styles.pageWrapper} >
                    <div className={styles.contentWrapper}>
                        <div className={styles.widthHeader}>
                            <div className={styles.headerWrapper}>
                                <div className={styles.logoLine}>
                                    <div className={styles.logo}>StateExam</div>
                                    <div className={styles.topLineButtonsBlock}>
                                        {this.renderSignBtn()}
                                        <div className={styles.swithcModBtn} onClick={this.goToSignUp}>
                                            <Button
                                                text={loc('apply-now')}
                                                buttonClassProp={styles.buttonClassProp}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.headerContent}>
                                    <div className={styles.headerContentLeft}>
                                        <div className={styles.threeLinesBlockWrapper}>
                                            <div className={fLine}>
                                                <div>Probably the best </div>
                                            </div>
                                            <div className={sLine}>
                                                <div>courses for</div>
                                            </div>
                                            <div className={fLine}>
                                                <div>russian exams</div>
                                            </div>
                                            <div className={styles.applyButtonBlockWrapper}>
                                                <div className={styles.applyButtonBlock} onClick={this.goToLessonsPage}>
                                                    <Button
                                                        text={loc('view-lessons')}
                                                        buttonClassProp={styles.applyButtonClassProp}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.headerContentRight}>
                                        <div className={styles.person}>
                                            <object
                                                className={styles.man}
                                                // data="./assets/group.svg">
                                                data="./assets/teachers.png">

                                            </object>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={styles.whyBlockWrapper}>
                            <div className={styles.whyBlock}>
                                <div className={styles.whyline}>
                                    <div className={styles.whyFLine}>
                                        {loc('why')}
                                    </div>
                                    <div className={styles.whySLine}>
                                        {}
                                    </div>
                                </div>

                                <div className={styles.questionline}>
                                    <div className={styles.questionLeft}>
                                        <div className={styles.questionLeftFLine}>
                                            01
                                </div>
                                        <div className={styles.questionLeftSLine}
                                            dangerouslySetInnerHTML={{ __html: loc('tutuor-1-question') }}>
                                        </div>

                                    </div>
                                    <div className={styles.questionRight}>
                                        <div className={question1Class}></div>
                                    </div>
                                </div>
                                <div className={styles.questionline}>
                                    <div className={styles.questionLeft}>
                                        <div className={styles.questionLeftFLine}>
                                            02
                                </div>
                                        <div className={styles.questionLeftSLine}
                                            dangerouslySetInnerHTML={{ __html: loc('tutuor-2-question') }}>
                                        </div>

                                    </div>
                                    <div className={styles.questionRight}>
                                        <div className={question2Class}></div>
                                    </div>
                                </div>
                                <div className={styles.questionline}>
                                    <div className={styles.questionLeft}>
                                        <div className={styles.questionLeftFLine}>
                                            03
                                </div>
                                        <div className={styles.questionLeftSLine}
                                            dangerouslySetInnerHTML={{ __html: loc('tutuor-3-question') }}>
                                        </div>

                                    </div>
                                    <div className={styles.questionRight}>
                                        <div className={question3Class}></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.getStartedBlock}>
                    <div className={styles.getStartedBlockWhiteLine}></div>
                    <div className={styles.getStartedBlockBlueLine}>
                        <div className={styles.getStarted}>
                            <div className={styles.getStartedText}>
                                Let`s get started
                            </div>
                            <div className={styles.applyButtonBlock} onClick={this.goToSignUp}>
                                <Button
                                    text={loc('apply-now')}
                                    buttonClassProp={styles.applyDarkButtonClassProp}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

