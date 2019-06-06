import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import {
    LangModDropDownList,
} from 'components/controls';

import styles from './FormDropDownList.scss';

export default class FormLangModDropDownList extends Component {
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
        const {label, error, value, withBorder, promptText, className, placeholder, withoutShadow, ...dropDownProps} = this.props;

        return (
            <FormField label={Boolean(value) ? label : ''} error={error}
                       withBorder={withBorder}
                       withoutShadow={withoutShadow}
                       promptText={promptText}
                       className={className}
                       onClick={() => {
                           this.refs.dropdown.click();
                       }}>
                <LangModDropDownList {...dropDownProps} value={value} className={styles.field} placeholder={placeholder}
                                     ref='dropdown'
                                     error={error}/>
            </FormField>
        );
    }

}
