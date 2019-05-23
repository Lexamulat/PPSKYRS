import React from 'react';
import queryString from 'query-string';

import styles from './RoomPage.scss';


class RoomPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            roomId: '',
        };

        const {search} = window.location;

        const query = queryString.parse(search);
        if (query && query.roomId) {
            this.state.roomId = Number(query.roomId);
        }
    }

    goBack = () => {
        this.props.onNavigate('/')
    }


    render() {
        const {roomId} = this.state;

        return (
            <div className={styles.wrapper}>
                <div className={styles.topLine}>
                    <div className={styles.backWrapper} onClick={this.goBack}>
                        <div>Back</div>
                    </div>
                    <div className={styles.logoWrapper}>
                        Quemonster
                    </div>
                </div>
                <div className={styles.content}>
                    {/*<iframe allow="microphone; camera;" width="100%" height="100%" scrolling="no" frameBorder="0"*/}
                    {/*src={`https://www.groupworld.net/room/2802/${roomId}?iframe=true&janus=true`}></iframe>*/}

                    <iframe ref={'frameRef'} allow="microphone; camera;" width="100%" height="100%" scrolling="no"
                            frameBorder="0"
                            src={`./frame.html?roomId=${roomId+config.instanceSuffix}`}></iframe>
                </div>

            </div>
        )
    }
}

export default RoomPage
