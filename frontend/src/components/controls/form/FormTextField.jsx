import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './FormTextField.scss';
import FormField from './FormField';
import TextField from '../TextField';
import classNames from 'classnames';

const PASSWORD_TYPE = 'password';

export default class FormTextField extends Component {
    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.any,
        className: PropTypes.string,
        labelClassName: PropTypes.string,
        errorLabelClassName: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        error: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        textFieldClass: PropTypes.string,
    };


    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            type: this.props.type,
            isRightIconActive: false,
            wasSwitchedFromPassordType: false
        };
    }

    onAction = () => {
        const { focused } = this.state;
        this.setState({ focused: !focused })
    }

    toggleSVGActive = () => {
        let { type, wasSwitchedFromPassordType } = this.state;
        if (type == PASSWORD_TYPE) type = 'text';
        if (wasSwitchedFromPassordType) type = 'password';
        this.setState((prev) => {
            return {
                isRightIconActive: !prev.isRightIconActive,
                wasSwitchedFromPassordType: !prev.isRightIconActive,
                type
            }
        });
    }

    renderRightIconOrError = () => {

        const { error, value,showPassPrompt } = this.props;
        const { type, isRightIconActive, wasSwitchedFromPassordType } = this.state;

        if (error) {
            const errSVGClass = classNames(styles.errSVG, {
                [styles.withErrorAndLabel]: error && Boolean(value),
            });
            return (
                <div className={errSVGClass}></div>
            )
        }

        if (type == PASSWORD_TYPE || wasSwitchedFromPassordType) {
            const eyeSVGClass = classNames(styles.eyeSVG, {
                [styles.activeEye]: isRightIconActive,
            });

            if(!value && showPassPrompt){
            return(
             <div className={styles.passPrompt}>
             <div>
             {loc('pass-prompt')}
             </div>
             </div>
            )
            }

            return (
                <div className={eyeSVGClass} onClick={this.toggleSVGActive}></div>
            )
        }
    }



    handleRender = () => {
        let {
            value,
            withBorder,
            label,
            promptText,
            className,
            textFieldClass,
            error,
            labelClassName,
            columnWrapperclass,
            errorLabelClassName,
            onClear,
            withRightIcon,

            ...restProps
        } = this.props;

        const { focused, type, wasSwitchedFromPassordType } = this.state;

        const fieldClassName = classNames(textFieldClass, {
            [styles.withIcon]: error || ((type == PASSWORD_TYPE || wasSwitchedFromPassordType) && Boolean(value)),
        });



        return (

            <FormField label={Boolean(value) ? label : ''} error={error}
                withBorder={withBorder}
                promptText={promptText}
                onClear={onClear}
                focused={focused}
                className={className}
                columnWrapperclass={columnWrapperclass}
                labelClassName={labelClassName}
                errorLabelClassName={errorLabelClassName}
                error={error}>
                <div className={styles.fieldsWrapper}>
                    <TextField {...restProps}
                        type={type}
                        withRightIcon={withRightIcon}
                        className={fieldClassName}
                        value={value}
                        onFocus={this.onAction}
                        onBlur={this.onAction}
                        error={error} />
                    {this.renderRightIconOrError()}

                </div>
            </FormField>
        );
    }

    render() {
        return (
            <div>{this.handleRender()}</div>
        );
    }
}
