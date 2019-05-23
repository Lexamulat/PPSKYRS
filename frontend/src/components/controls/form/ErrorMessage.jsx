import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorMessage.scss';
import classNames from 'classnames';

export default class ErrorMessage extends Component {
    static propTypes = {
        className: PropTypes.string,
        closeErrorAction: PropTypes.func,
    };


    render() {
        const {className, closeErrorAction} = this.props;

        const errorClassName = classNames(styles.errorMessage, className);

        return (
            <div className={errorClassName}>
                {this.props.children}
                <div className={styles.closeIcon} onClick={closeErrorAction}></div>
            </div>
        );
    }
}
