import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormField from './FormField';

import styles from './FormCheckbox.scss'


export default class FormCheckbox extends Component {
    static propTypes = {
        className: PropTypes.string,
        withPrompt: PropTypes.bool,
        label: PropTypes.string,
        checkboxLabel: PropTypes.string,
        fieldKey: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        error: PropTypes.string,
        checkboxContainerClass: PropTypes.string,
        onChange: PropTypes.func,
        changeInside: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
        }
    }

    render() {
        const {
            label,
            className,
            error,
            fieldKey,
            checked,
            checkboxLabel,
            checkboxContainerClass,
            changeInside
        } = this.props;

        const {status} = this.state;

        const labelClassName = classNames(styles.label, error ? styles.error : '');

        const checkboxContainerClassName = classNames(styles.checkboxContainer, checkboxContainerClass);

        return (
            <FormField label={label}
                       className={className}
                       withoutBorder
                       withoutError
                       error={error}
            >
                <div className={checkboxContainerClassName}>
                    <input type='checkbox' className={styles.input} id={`${fieldKey}_input`}
                           checked={changeInside ? status : checked}
                           onChange={this.handleChange}/>
                    <div className={styles.checkbox} onClick={() => {
                        this.refs[`${fieldKey}_label`].click();
                    }}/>
                    <label ref={`${fieldKey}_label`} className={labelClassName}
                           htmlFor={`${fieldKey}_input`}>
                        {checkboxLabel}
                    </label>
                </div>

            </FormField>
        )
    }

    handleChange = e => {
        const {onChange, fieldKey, changeInside} = this.props;
        if (changeInside) {
            const {status} = this.state;
            this.setState({status: !status})
        } else {
            onChange(fieldKey, {target: {value: e.target.checked}});
        }

    }
}
