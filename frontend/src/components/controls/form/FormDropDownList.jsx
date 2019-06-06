import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import DropDownList from '../DropDownList';

import styles from './FormDropDownList.scss';

export default class FormDropDownList extends Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.any,
        items: PropTypes.array,
        formatter: PropTypes.func,
        searchable: PropTypes.bool,
        canBeNotSelected: PropTypes.bool,
        multipleSelection: PropTypes.bool,
        multipleFormatter: PropTypes.func,
        error: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        customClassName: PropTypes.any,
        withBorder: PropTypes.bool,
        withShadow: PropTypes.bool,
    };

    render() {
        const {label, error, value, withBorder, withoutShadow, promptText,labelClassName,
            className, placeholder, ...dropDownProps} = this.props;

        return (
            <FormField label={Boolean(value) ? label : ''} error={error}
                       withBorder={withBorder}
                       withoutShadow={withoutShadow}
                       promptText={promptText}
                       className={className}
                       labelClassName={labelClassName}
                       onClick={() => {
                           this.refs.dropdown.click();
                       }}>
                <DropDownList {...dropDownProps} value={value} className={styles.field} placeholder={placeholder}
                              ref='dropdown'
                              error={error}/>
            </FormField>
        );
    }

}
