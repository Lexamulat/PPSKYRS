import React from 'react';


import styles from './TeacherLoginPagesWrapper.scss';

const HOME_PATH = '/';


export default class TeacherLoginPagesWrapper extends React.PureComponent {


    handleGoTo = (path) => () => {
        this.props.onNavigate(path)
    }


    render() {
        const { children } = this.props;

        return (
            <div className={styles.wrapper}>

                <div className={styles.logoWrapper}>
                    <div className={styles.logo} onClick={this.handleGoTo(HOME_PATH)}>StateExam</div>
                </div>
                {children}
                <div className={styles.logoWrapper}>
                </div>

            </div>
        )

    }
}
