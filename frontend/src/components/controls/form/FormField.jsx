import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './FormField.scss';
import classNames from 'classnames';

export default class FormField extends Component {
    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
        error: PropTypes.any,
        labelClassName: PropTypes.string,
        columnWrapperclass: PropTypes.string,
        errorLabelClassName: PropTypes.string,
        withBorder: PropTypes.bool,
        withoutShadow: PropTypes.bool,
        withoutError: PropTypes.bool,
        onClear: PropTypes.func,
    };

    render() {
        const {
            label,
            className,
            columnWrapperclass,
            error,
            children,
            labelClassName,
            errorLabelClassName,
            withoutBorder,
            withoutError,
            onClear
        } = this.props;

        const fieldClassName = classNames(styles.formField, className, {
            [styles.withError]: error,
            [styles.withoutBorder]: withoutBorder

        });

        const fieldLabelClassName = classNames(styles.label, labelClassName, {
            [styles.error]: error,
            [errorLabelClassName]: error,
            [styles.labelPadding]: Boolean(label)
        });

        const columnWrapperClassName = classNames(styles.columnWrapper, columnWrapperclass);

        return (
            <div className={styles.fieldWrapper}>
                <div className={fieldClassName}>
                    <div className={columnWrapperClassName}>
                        <label className={fieldLabelClassName}>{label}</label>
                        {children}
                    </div>
                    {onClear && <div className={styles.icon}
                                     onClick={this.props.onClear}
                    ></div>}
                </div>

                {!withoutError && <div className={styles.errorWrapper}>
                    {error}
                </div>}

            </div>
        );
    }
}
