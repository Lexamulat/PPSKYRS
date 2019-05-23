import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/style.css';
import './StartScreen.scss';

import styles from './StartScreen.scss';


class StartScreen extends React.Component {

    static propTypes = {
        onTest: PropTypes.func.isRequired,

        test: PropTypes.object,
        testError: PropTypes.object,
        testProcessing: PropTypes.bool,

    };


    componentWillMount() {
        this.props.onTest();
    }

    componentWillReceiveProps(nextProps) {

    }

    redirectToRoom(id) {
        this.props.onNavigate(`/room?roomId=${id}`)
    }

    handleLogin = () => {
        this.props.onLogin('t@t.com', 'ttt');

    }
    handleLogOut = () => {
        this.props.onLogOut();
    }

    renderRooms() {
        const mas = [{id: 1, name: 'Groupworld room 1'},
            {id: 2, name: 'Groupworld room 2'},
            {id: 3, name: 'Groupworld room  3'}];

        return (
            <div className={styles.tableWrapper}>
                {
                    mas.map(el => {
                        return (
                            <div key={el.id} className={styles.romItem} onClick={this.redirectToRoom.bind(this, el.id)}>
                                <div>{el.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        )

    }


    render() {
        return (
            <div className={styles.wrapper}>

                <div className={styles.topLine}>
                    <div className={styles.logoWrapper}>
                        Quemonster
                    </div>
                    {/*<div  className={styles.loginWrapper} onClick={this.handleLogin}>*/}
                    {/*<div>Login</div>*/}
                    {/*</div>*/}
                    {/*<div className={styles.loginWrapper} onClick={this.handleLogOut}>*/}
                    {/*<div>Log out</div>*/}
                    {/*</div>*/}

                </div>
                <div className={styles.content}>
                    {this.renderRooms()}
                </div>
            </div>
        )
    }
}

export default StartScreen
