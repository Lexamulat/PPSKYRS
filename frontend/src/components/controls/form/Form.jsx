import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './Form.scss';
import classNames from 'classnames';
import parseServerValidationErrors from 'sources/api/parseServerValidationErrors';

export default class Form extends Component {
    static propTypes = {
        fieldValues: PropTypes.object.isRequired,
        clientValidate: PropTypes.func.isRequired,
        serverError: PropTypes.object,
        processing: PropTypes.bool,
        onFieldChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        children: PropTypes.any.isRequired,
        onErrors: PropTypes.func,
    };

    static defaultProps = {
        onErrors: () => {
        }
    };

    state = {
        wasSubmit: false,
        editedAfterSubmit: false
    };

    getValidationErrors = () => {
        const {editedAfterSubmit, wasSubmit} = this.state;
        const {serverError} = this.props;

        const clientErrors = wasSubmit ? this.getClientValidationErrors() : {};
        const serverErrors = _.mapValues(parseServerValidationErrors(serverError), i => i.label);

        const validationErrors = {...clientErrors};
        if (!editedAfterSubmit)
            Object.assign(validationErrors, serverErrors);

        return validationErrors;
    };

    render() {
        const {className, onSubmit} = this.props;

        const validationErrors = this.getValidationErrors();

        const formClassName = classNames(styles.form, className);

        return (
            <form className={formClassName} onSubmit={this.handleSubmit} ref='form'>
                {Array.isArray(this.props.children)
                    ? this.props.children.map(this.renderFormField(validationErrors))
                    : [this.props.children].map(this.renderFormField(validationErrors))}
            </form>
        );
    }

    getClientValidationErrors() {
        const {clientValidate, fieldValues} = this.props;

        return clientValidate(fieldValues);
    }

    hasClientValidationErrors() {
        return Object.keys(this.getClientValidationErrors())
            .map(key => this.getClientValidationErrors()[key])
            .some(v => Boolean(v))
    }

    renderFormField = validationErrors => (field, index) => {
        if (!field)
            return field;
        const {fieldValues, onFieldChange} = this.props;

        const props = {
            key: index
        };

        if (field.props.type === 'submit') {
            props.onClick = this.handleSubmit;
            props.disabled = field.props.disabled || this.props.processing;
        }

        if (field.props.fieldKey) {
            const {fieldKey} = field.props;

            props.value = fieldValues[fieldKey];
            props.error = validationErrors[fieldKey] || field.props.error;
            props.onChange = this.handleFieldChange(fieldKey);
        }

        if (field.props.type === 'FormFieldWrapper') {
            props.value = fieldValues;
            props.error = validationErrors;
            props.onChange = this.handleFieldChange;
        }

        if (field.props.type === 'commonErrors') {
            if (validationErrors.common)
                props.children = field.props.children || validationErrors.common;
        }


        return React.cloneElement(field, props);
    };

    handleFieldChange = fieldKey => (...args) => {
        const {onFieldChange} = this.props;
        onFieldChange(fieldKey, ...args);

        this.setState({
            editedAfterSubmit: true
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.hasClientValidationErrors()) {
            this.props.onErrors();
            this.setState({
                wasSubmit: true
            });
            return;
        }

        this.setState({
            wasSubmit: true,
            editedAfterSubmit: false
        });

        const {onSubmit, fieldValues} = this.props;

        onSubmit(fieldValues);
    };

    clearForm() {
        this.setState({
            wasSubmit: false,
            editedAfterSubmit: false
        })
    }
}
