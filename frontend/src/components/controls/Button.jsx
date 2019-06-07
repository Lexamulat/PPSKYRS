import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import styles from './Button.scss';

export default class Button extends React.PureComponent {


    static propTypes = {
        type: PropTypes.string,
        text: PropTypes.string,
        buttonClassProp: PropTypes.string,
        onClick: PropTypes.func,

    };

    render() {

        const { type, onClick, text, buttonClassProp } = this.props;
        console.log("TCL: Button -> render -> text", text)



        const buttonClass = classNames(styles.buttonWrapper, buttonClassProp)

        return (
                <button type={type}
                    onClick={onClick}
                    className={buttonClass}
                >
                    {text}
                </button>
        );

    }
}


