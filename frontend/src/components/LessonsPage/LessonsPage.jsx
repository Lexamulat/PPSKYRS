import React from 'react';
import PropTypes from 'prop-types';

import {
    Button
} from 'components/controls';



import styles from './LessonsPage.scss';


export default class LessonsPage extends React.Component {

    static propTypes = {

        onNavigate: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired,


        // onCheckResetPasswordToken: PropTypes.func.isRequired,

        // checkResetPassToken: PropTypes.object,
        // checkResetPassTokenError: PropTypes.object,
        // checkResetPassTokenProcessing: PropTypes.bool,

        // onLogout: PropTypes.func.isRequired,

        // login: PropTypes.object,
        // loginError: PropTypes.object,
        // loginProcessing: PropTypes.bool,


    };

    constructor(props) {
        super(props);
        this.state = {

        };
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

    render() {


        return (
            <div className={styles.page}>
                <div className={styles.logoLine}>
                    <div className={styles.logo} onClick={() => { this.props.onNavigate('/') }}>StateExam</div>
                    <div className={styles.topLineButtonsBlock}>
                        {this.renderSignBtn()}
                    </div>
                </div>
                <section className={styles.pageContent}>
                    <section className={styles.filterWrapper}>
                        <div className={styles.filterContent}>
                            <div className={styles.filterTitleLine}>
                                <div className={styles.filterTitleBlock}>
                                    <span className={styles.filterTitleText}>Filter</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.filterBorderLine}>
                            <div className={styles.line}>
                            </div>
                        </div>
                    </section>



                    <div>
                    </div>

                </section>
            </div>
        )
    }
}


