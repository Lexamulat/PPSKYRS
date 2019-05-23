import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './TextField.scss';
import classNames from 'classnames';

export default class TextField extends Component {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.any,
        error: PropTypes.any,
        disabled: PropTypes.bool,
        maxLength: PropTypes.number,
        onChange: PropTypes.func,
        onEnter: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onKeyDown: PropTypes.func,
        min: PropTypes.number,
        max: PropTypes.number,
        icon: PropTypes.string,
        mask: PropTypes.string,
    };

    static defaultProps = {
        type: 'text',
        withShadow: true
    };

    render() {
        const {
            className,
            type,
            placeholder,
            value,
            error,
            disabled,
            maxLength,
            onBlur,
            min,
            max,
            icon,
            onFocus,
            withShadow,
            withRightIcon
        } = this.props;

        const inputClassName = classNames(styles.field, className, {
            [styles.highlightError]: Boolean(error),
            [styles.withIcon]: Boolean(icon),
            [styles.withShadow]: Boolean(withShadow),
            [styles.fieldWithLabel]: Boolean(value),
            [styles.widthWithError]: Boolean(error),
            [styles.withRightIcon]:Boolean(withRightIcon)&& Boolean(value)

        });

        const style = Boolean(icon)
            ? {backgroundImage: `url(${icon})`}
            : {};

        return (
            <input
                type={type}
                className={inputClassName}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                maxLength={maxLength}
                min={min}
                style={style}
                max={max}
                onChange={this.handleOnChange}
                onKeyDown={this.handleKeyDown}
                onBlur={onBlur}
                onFocus={onFocus}/>
        );
    }

    handleOnChange = event => {
        const {min, max, onChange} = this.props;
        const value = event.target.value;
        if (min !== undefined && value < min) {
            event.target.value = min;
        } else if (max !== undefined && value > max) {
            event.target.value = max;
        }
        onChange(event);
    };

    handleKeyDown = event => {
        const {onKeyDown, onEnter} = this.props;

        if (event.key !== 'Enter' && !onKeyDown)
            return;

        onKeyDown && onKeyDown(event);

        if (!onEnter)
            return;

        event.preventDefault();
        this.props.onEnter();
    };
}
