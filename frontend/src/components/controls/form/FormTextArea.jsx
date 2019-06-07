import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import TextArea from '../TextArea';

export default class FormTextArea extends Component {
    static propTypes = {
        label: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        error: PropTypes.string,
        onChange: PropTypes.func
    };

    render() {
        const {
            label,
            error,
            className,
            value,
            labelClassName,
            ...restProps,

        } = this.props;

        return (
            <FormField
                error={error}
                className={className}
                labelClassName={labelClassName}
                label={Boolean(value) ? label : ''}
            >
                <TextArea
                    value={value}
                    {...restProps} error={error} />
            </FormField>
        );
    }
}
