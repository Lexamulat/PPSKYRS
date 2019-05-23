import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BounceLoader} from 'react-spinners';

import styles from './Spinner.scss';
import classNames from 'classnames';

export default class Spinner extends Component {
    static propTypes = {
        className: PropTypes.string,
        hidden: PropTypes.bool
    };

    render() {
        const {hidden, className} = this.props;

        const containerClassName = classNames(styles.container, className, {
            [styles.hidden]: hidden
        });

        return (
            <div className={containerClassName}>
                <BounceLoader color='#70b0f3'
                            size={40}/>
            </div>
        );
    }
}
